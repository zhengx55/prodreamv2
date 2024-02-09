'use client';
import Panel from '@/components/auth/Panel';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useUserLogin } from '@/query/query';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [hidePassword, setHidePassword] = useState(true);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { mutateAsync: handleLogin } = useUserLogin();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await handleLogin(values);
  }

  return (
    <>
      <Panel>
        <div className='flex w-full flex-col sm:w-[600px]'>
          <h1 className='text-[24px] font-[500] sm:text-[28px] 2xl:text-[42px]'>
            Welcome Back!
          </h1>
          <p className='base-medium 2xl:title-medium font-[400] text-shadow-100'>
            Ready to continue crafting your unique story?
          </p>
          <Spacer y='100' className='hidden 2xl:block' />
          <Spacer y='40' className='block 2xl:hidden' />
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
                      className='base-semibold 2xl:title-semibold'
                      htmlFor='username'
                    >
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='email'
                        id='username'
                        placeholder=''
                        className='h-12 rounded-md border'
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
                      className='base-semibold 2xl:title-semibold'
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
                        className='h-12 rounded-md border'
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
            Don&apos;t have an account?&nbsp;
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

      <div className='relative hidden h-full w-1/2 bg-[#FAF9FF] sm:flex sm:flex-col sm:items-center sm:pt-20'>
        <h1 className='font-baskerville font-[400] sm:text-[40px] 2xl:text-[48px]'>
          Transform your academic <br />
          writing journey
        </h1>
        <Spacer y='80' />
        <Image
          src='/auth/auth.png'
          alt='logo'
          priority
          width={800}
          height={200}
          className='h-auto w-[75%]'
        />
      </div>
    </>
  );
}
