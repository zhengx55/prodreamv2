'use client';
import * as z from 'zod';
import Panel from '@/components/auth/Panel';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/validation';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import GoogleSignin from '@/components/auth/GoogleSignin';
import { Eye, EyeOff } from 'lucide-react';
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

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(123);
  }

  return (
    <section className='flex-center flex-1'>
      <Panel>
        <h1 className='h2-bold self-center'>Welcome Back!</h1>
        <p className='body-normal self-center text-shadow-100'>
          Ready to continue crafting your unique story?
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-6'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='mt-10'>
                  <FormLabel className='text-black-400' htmlFor='username'>
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='email'
                      id='username'
                      placeholder=''
                      className='rounded-2xl border-none bg-shadow-50'
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
                  <FormLabel className='text-black-400' htmlFor='password'>
                    Password
                  </FormLabel>
                  {!hidePassword ? (
                    <EyeOff
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-8 cursor-pointer'
                    />
                  ) : (
                    <Eye
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-8 cursor-pointer'
                    />
                  )}

                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      id='password'
                      type={hidePassword ? 'password' : 'text'}
                      placeholder=''
                      className='rounded-2xl border-none bg-shadow-50'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <Link
              href={'/'}
              className='small-semibold cursor-pointer self-end text-primary-200 hover:underline'
            >
              Forgot Password?
            </Link>
            <Button className='w-full rounded-full' type='submit'>
              Sign in
            </Button>
          </form>
        </Form>
        <div className='flex-center relative my-10'>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <p className='small-regular absolute bg-white px-2 text-shadow-100'>
            Or Sign in with
          </p>
        </div>
        <GoogleSignin />
        <p className='small-regular mt-8 self-center text-black-200'>
          Don&apos;t have an account?&nbsp;
          <Link href={'/signup'} className='text-primary-200'>
            Sign up
          </Link>
        </p>
      </Panel>
    </section>
  );
}
