'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { getReferralSource } from '@/lib/utils';
import { createSignUpSchema } from '@/lib/validation';
import {
  loginWithPhoneNumberAndPasswordCN,
  userLogin,
  userSignUp,
} from '@/query/api';
import { ISigunUpRequest } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';
import Spacer from '../root/Spacer';

const defaultValues = { password: '', email: '' };

// !该组件为CN独有的密码登录
const SignUpForm = () => {
  const [readAndAgree, setReadAndAgree] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const searchParam = useSearchParams().get('from');
  const { lang } = useParams();
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);
  const trans = useTranslations('Auth');
  const transSuccess = useTranslations('Success');
  const signUpSchema = createSignUpSchema(trans);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });
  const { mutateAsync: handleSignup, isPending: isSignupPending } = useMutation(
    {
      mutationFn: (param: ISigunUpRequest) => userSignUp(param),
      onSuccess: async (_, variables, _contex) => {
        try {
          const toast = (await import('sonner')).toast;
          const successInfo = transSuccess('Successfully_signed_up');
          toast.success(successInfo);
          const login_data = await userLogin({
            username: variables.email,
            password: variables.password,
          });
          setCookie('token', login_data.access_token, {
            path: '/',
            maxAge: 604800,
            secure: true,
            sameSite: 'lax',
          });
          router.push(`/${lang}/onboard`);
        } catch (error) {
          router.push('/editor');
        }
      },
      onError: async (error) => {
        const toast = (await import('sonner')).toast;
        toast.error(error.message);
      },
    }
  );

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const referral = getReferralSource();
    await handleSignup({
      email: values.email,
      password: values.password,
      is_mobile: isMobile,
      referral,
      traffic_source: searchParam ?? undefined,
    });
  }

  const PasswordToggleIcon = hidePassword ? EyeOff : Eye;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-5'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormControl>
                <Input
                  autoComplete='email'
                  type='email'
                  id='username'
                  placeholder={'请输入邮箱或手机号'}
                  className='placeholder:base-regular h-12 rounded-md border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <PasswordToggleIcon
                onClick={() => setHidePassword((prev) => !prev)}
                size={20}
                className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
              />
              <FormControl>
                <Input
                  autoComplete='current-password'
                  id='password'
                  type={hidePassword ? 'password' : 'text'}
                  placeholder={'请输入密码'}
                  className='placeholder:base-regular h-12 rounded-md border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />
        <Link
          href={`/${lang}/reset-password`}
          className='-mt-4 cursor-pointer self-end text-sm text-violet-500'
        >
          {trans('Login.Forget')}
        </Link>
        <Spacer y='4' />
        <div className='flex items-center gap-x-2'>
          <Checkbox
            checked={readAndAgree}
            onCheckedChange={(e: boolean) => setReadAndAgree(e)}
            className='h-4 w-4 border-violet-500'
            id='readAndAgree'
          />
          <label
            className='subtle-regular text-neutral-400'
            htmlFor='readAndAgree'
          >
            我已阅读并同意{' '}
            <a
              href='https://prodream.larksuite.com/docx/QrxPdV4PRoR1G6xAIpUu9rL3srh'
              className='text-blue-600'
            >
              服务协议
            </a>{' '}
            和{' '}
            <a
              href='https://prodream.larksuite.com/docx/RGZCda4XkosGSkxcz2xua4PxsSc'
              className='text-blue-600'
            >
              隐私协议
            </a>
          </label>
        </div>
        <Button
          className='w-full rounded bg-violet-500'
          type='submit'
          disabled={!readAndAgree || isSignupPending}
        >
          {isSignupPending && (
            <Loader2 className='animate-spin text-white' size={22} />
          )}
          {'登录/注册'}
        </Button>
      </form>
    </Form>
  );
};
export default SignUpForm;
