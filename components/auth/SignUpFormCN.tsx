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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { createSignUpSchemaCN } from '@/lib/validation';
import {
  loginWithPhoneNumberAndPasswordCN,
  userLogin,
  userSignUp,
} from '@/query/api';
import { ILoginWithPhoneNumberAndPasswordCN } from '@/query/type';
import { getCountryPhonePrefixList } from '@/lib/aboutPhonenumber/getCountryPhonePrefixList';
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
const SignUpFormCN = () => {
  const [readAndAgree, setReadAndAgree] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [selectedPrefix, setSelectedPrefix] = useState('CN +86');
  const { lang } = useParams();
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);
  const transAuth = useTranslations('Auth');
  const transSuccess = useTranslations('Success');
  const signUpSchema = createSignUpSchemaCN(
    transAuth,
    selectedPrefix.split(' ')[0]
  );
  const countryPhonePrefixList = getCountryPhonePrefixList(false, true);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });
  const { mutateAsync: handleSignup, isPending: isSignupPending } = useMutation(
    {
      mutationFn: (param: ILoginWithPhoneNumberAndPasswordCN) => {
        const { emailOrPhone, password } = param;
        const isEmail = emailOrPhone.includes('@');
        if (isEmail) {
          return userSignUp({ email: emailOrPhone, password });
        }
        return loginWithPhoneNumberAndPasswordCN({
          email: '',
          password,
          phone_number: `${selectedPrefix.split(' ')[1]}${emailOrPhone}`,
        });
      },
      onSuccess: async (_, variables, _contex) => {
        try {
          const toast = (await import('sonner')).toast;
          const successInfo = transSuccess('Successfully_signed_up');
          toast.success(successInfo);
          const login_data = await userLogin({
            username: variables.emailOrPhone,
            password: variables.password,
          });
          setCookie('token', login_data.access_token, {
            path: '/',
            maxAge: 604800,
            secure: true,
            sameSite: 'lax',
          });
          router.push(`/${lang}/editor`);
        } catch (error) {
          router.push(`/${lang}/editor`);
        }
      },
      onError: async (error) => {
        const toast = (await import('sonner')).toast;
        toast.error(error.message);
      },
    }
  );

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    await handleSignup({
      emailOrPhone: values.emailOrPhone,
      password: values.password,
    });
  }

  const PasswordToggleIcon = hidePassword ? EyeOff : Eye;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-5'
      >
        <div className='flex items-center gap-x-2'>
          <Select
            value={selectedPrefix}
            onValueChange={(value) => setSelectedPrefix(value)}
          >
            <SelectTrigger className='h-max w-[116px] gap-x-2 rounded-lg px-4 py-3.5'>
              <SelectValue placeholder={selectedPrefix} />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              {Object.entries(countryPhonePrefixList).map(([code, prefix]) => (
                <SelectItem key={code} value={`${code} ${prefix}`}>
                  {code} {prefix}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormField
            control={form.control}
            name='emailOrPhone'
            render={({ field }) => (
              <FormItem className='relative flex-grow'>
                <FormControl>
                  <Input
                    autoComplete='email'
                    type='emailOrPhone'
                    id='username'
                    placeholder={transAuth(
                      'Schema.Please_Input_Email_or_Phone_Number'
                    )}
                    className='placeholder:base-regular h-12 rounded-md border'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
              </FormItem>
            )}
          />
        </div>

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
                  placeholder={transAuth('Schema.Please_Input_Password')}
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
          {transAuth('Login.Forget')}
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
            {transAuth('Schema.I_have_read_and_agree_to_the')}{' '}
            <a
              href='https://prodream.larksuite.com/docx/QrxPdV4PRoR1G6xAIpUu9rL3srh'
              className='text-blue-600'
            >
              {transAuth('Schema.Terms_of_Service')}
            </a>{' '}
            {transAuth('Schema.And')}{' '}
            <a
              href='https://prodream.larksuite.com/docx/RGZCda4XkosGSkxcz2xua4PxsSc'
              className='text-blue-600'
            >
              {transAuth('Schema.Privacy_Policy')}
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
          {transAuth('Schema.Login_Signup')}
        </Button>
      </form>
    </Form>
  );
};
export default SignUpFormCN;
