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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SampleEssay } from '@/constant/enum';
import { signUpSchema } from '@/lib/validation';
import { createDoc, userLogin, userSignUp } from '@/query/api';
import { ISigunUpRequest } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';

const SignUpForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const posthog = usePostHog();
  const searchParam = useSearchParams().get('from');
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: '',
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
          });
          const new_doc_id = await createDoc(
            SampleEssay.TEXT,
            SampleEssay.TITLE
          );

          router.push(`/editor/${new_doc_id}`);
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
      first_name: values.first_name,
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
          name='first_name'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel
                className='base-semibold 2xl:title-semibold'
                htmlFor='first_name'
              >
                Name
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete='first_name'
                  id='first_name'
                  placeholder='e.g. Max Tang'
                  className='h-12 rounded-md border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel
                className='base-semibold 2xl:title-semibold'
                htmlFor='username'
              >
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete='email'
                  type='email'
                  id='username'
                  placeholder='e.g hey@prodream.ai'
                  className='h-12 rounded-md border'
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
              <FormLabel
                className='base-semibold 2xl:title-semibold'
                htmlFor='password'
              >
                Password
              </FormLabel>
              {!hidePassword ? (
                <EyeOff
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={20}
                  className='absolute right-2 top-9 cursor-pointer'
                />
              ) : (
                <Eye
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={20}
                  className='absolute right-2 top-9 cursor-pointer'
                />
              )}
              <FormControl>
                <Input
                  autoComplete='current-password'
                  id='password'
                  type={hidePassword ? 'password' : 'text'}
                  placeholder='Must be at least 8 characters'
                  className='h-12 rounded-md border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />

        <p className='small-regular cursor-pointer self-start text-black-400'>
          By Continuing, you agree to&nbsp;Applify AI&apos;s&nbsp;
          <Link
            target='_blank'
            href={
              'https://applifyai.notion.site/Applify-AI-Subscription-Agreement-eef0b3cfdab6496dbe0fa04a3c9a0d3e?pvs=4'
            }
            className='text-auth-primary'
          >
            Term of Service
          </Link>
          &nbsp; and
          <Link
            target='_blank'
            href={
              'https://applifyai.notion.site/Applify-AI-Privacy-Policy-e350e311e90c48608b4e85a8c7982e77'
            }
            className='text-auth-primary'
          >
            &nbsp;Privacy Policy
          </Link>
        </p>
        <Button
          disabled={isSignupPending}
          className='w-full rounded bg-auth-primary'
          type='submit'
        >
          {isSignupPending && (
            <Loader2 className='animate-spin text-white' size={22} />
          )}
          Sign up
        </Button>
      </form>
    </Form>
  );
};
export default SignUpForm;
