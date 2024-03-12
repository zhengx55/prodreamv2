'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/validation';
import { useUserLogin } from '@/query/query';
import { HomePageDicType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const LoginForm = ({ t, lang }: HomePageDicType) => {
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
          href={`/${lang}/reset-password`}
          className='small-semibold cursor-pointer self-end text-auth-primary hover:underline'
        >
          Forgot Password?
        </Link>
        <Button className='w-full rounded bg-auth-primary' type='submit'>
          Sign in
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
