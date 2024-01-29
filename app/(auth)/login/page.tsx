'use client';
import Panel from '@/components/auth/Panel';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import GoogleSignin from '@/components/auth/GoogleSignin';
import Spacer from '@/components/root/Spacer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { loginSchema } from '@/lib/validation';
import { userLogin } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [_cookies, setCookie] = useCookies(['token']);
  const posthog = usePostHog();
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { mutateAsync: handleLogin } = useMutation({
    mutationFn: (param: { username: string; password: string }) =>
      userLogin(param),
    onSuccess: async (data) => {
      toast.success('Successfully Login');
      const user_id = JSON.parse(atob(data.access_token.split('.')[1])).subject
        .user_id;
      posthog.identify(user_id);
      setCookie('token', data.access_token, {
        path: '/',
        maxAge: 604800,
        secure: true,
      });
      router.push('/writtingpal/polish');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await handleLogin(values);
  }

  return (
    <>
      <Panel>
        <div className='flex w-[600px] flex-col'>
          <h1 className='self-center text-[28px] font-[500] sm:text-[42px]'>
            Welcome Back!
          </h1>
          <p className='title-semibold self-center font-[400] text-shadow-100 sm:mb-[100px] sm:text-[18px]'>
            Ready to continue crafting your unique story?
          </p>

          <GoogleSignin label='Sign in with Google' />
          <div className='flex-center relative my-10'>
            <Separator orientation='horizontal' className='bg-shadow-border' />
            <p className='small-regular absolute bg-white px-2 text-shadow-100'>
              Or log in with
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-y-6'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='mt-0'>
                    <FormLabel
                      className=' title-semibold sm:title-semibold text-[#17161B]'
                      htmlFor='username'
                    >
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='email'
                        id='username'
                        placeholder=''
                        className='rounded-[8px] border border-[#D4D3D8] bg-[#fff]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-400' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel
                      className=' title-semibold sm:title-semibold text-[#17161B]'
                      htmlFor='password'
                    >
                      Password
                    </FormLabel>
                    {!hidePassword ? (
                      <EyeOff
                        onClick={() => setHidePassword((prev) => !prev)}
                        size={22}
                        className='absolute right-2 top-10 cursor-pointer'
                      />
                    ) : (
                      <Eye
                        onClick={() => setHidePassword((prev) => !prev)}
                        size={22}
                        className='absolute right-2 top-10 cursor-pointer'
                      />
                    )}

                    <FormControl>
                      <Input
                        autoComplete='current-password'
                        id='password'
                        type={hidePassword ? 'password' : 'text'}
                        placeholder=''
                        className='rounded-[8px] border border-[#D4D3D8] bg-[#fff]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-400' />
                  </FormItem>
                )}
              />
              <Link
                href={'/reset-password'}
                className='small-semibold cursor-pointer self-end text-auth-primary hover:underline'
              >
                Forgot Password?
              </Link>
              <Button className='w-full rounded bg-auth-primary' type='submit'>
                Sign in
              </Button>
            </form>
          </Form>
          <Spacer y='20' />
          <p className='small-regular self-center text-black-200'>
            Already a member?&nbsp;
            <Link
              href={'/signup'}
              prefetch
              className='small-semibold text-auth-primary'
            >
              Sign up
            </Link>
          </p>
        </div>
      </Panel>

      <div className='relative hidden h-full w-1/2 bg-white sm:flex'>
        <Image
          src='/auth/auth.png'
          alt='logo'
          fill
          priority
          sizes='(max-width: 600px) 100vw, 50vw'
        />
      </div>
    </>
  );
}
