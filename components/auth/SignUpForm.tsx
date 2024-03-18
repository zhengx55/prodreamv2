'use client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpSchema } from '@/lib/validation';
import { userLogin, userSignUp } from '@/query/api';
import { ISigunUpRequest } from '@/query/type';
import { AuthPageDicType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';
import Spacer from '../root/Spacer';

const SignUpForm = ({ t, lang }: AuthPageDicType) => {
  const [hidePassword, setHidePassword] = useState(true);
  const posthog = usePostHog();
  const searchParam = useSearchParams().get('from');
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  });
  const { mutateAsync: handleSignup, isPending: isSignupPending } = useMutation(
    {
      mutationFn: (param: ISigunUpRequest) => userSignUp(param),
      onSuccess: async (_, variables, _contex) => {
        try {
          const toast = (await import('sonner')).toast;
          toast.success('Successfully signed up');
          const login_data = await userLogin({
            username: variables.email,
            password: variables.password,
          });
          const user_id = JSON.parse(
            atob(login_data.access_token.split('.')[1])
          ).subject.user_id;
          posthog.identify(user_id);
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
    await handleSignup({
      email: values.email,
      password: values.password,
      is_mobile: isMobile,
      referral: searchParam ?? undefined,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-6'
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
                  placeholder={t.FormEmail}
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
              {!hidePassword ? (
                <EyeOff
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={20}
                  className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                />
              ) : (
                <Eye
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={20}
                  className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                />
              )}
              <FormControl>
                <Input
                  autoComplete='current-password'
                  id='password'
                  type={hidePassword ? 'password' : 'text'}
                  placeholder={t.FormPassword}
                  className='placeholder:base-regular h-12 rounded-md border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />
        {/* {lang === 'en' && (
          <p className='small-regular cursor-pointer self-start text-neutral-400'>
            By Continuing, you agree to&nbsp;Applify AI&apos;s&nbsp;
            <Link
              target='_blank'
              href={
                'https://applifyai.notion.site/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e?pvs=4'
              }
              className='text-auth-primary'
            >
              {t.Signup.Term}
            </Link>
            &nbsp; and
            <Link
              target='_blank'
              href={
                'https://applifyai.notion.site/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
              }
              className='text-auth-primary'
            >
              &nbsp;{t.Signup.Privacy}
            </Link>
          </p>
        )} */}
        <Spacer y='20' />
        <Button
          disabled={isSignupPending}
          className='w-full rounded bg-auth-primary'
          type='submit'
        >
          {isSignupPending && (
            <Loader2 className='animate-spin text-white' size={22} />
          )}
          {t.Signup.Button}
        </Button>
      </form>
    </Form>
  );
};
export default SignUpForm;
