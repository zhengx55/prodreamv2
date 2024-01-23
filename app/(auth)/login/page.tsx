'use client';
import Panel from '@/components/auth/Panel';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import * as z from 'zod';

import GoogleSignin from '@/components/auth/GoogleSignin';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [_cookies, setCookie] = useCookies(['token']);
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
      setCookie('token', data.access_token, {
        path: '/',
        maxAge: 604800,
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
    <section className='overflow-hidden w-full flex-center flex-1'>
      <div className='hidden sm:block w-1/2 bg-[#fff]'>
        <Image
          src='/auth/login_icon.png'
          width={960}
          height={1129}
          alt='logo'
          className='h-auto w-full'
          priority
        />
      </div>
      <Panel>
        <h1 className='sm:text-[48px] text-[28px] font-[600] self-start'>Welcome Back!</h1>
        <p className='sm:text-[24px] text-[20px] font-[400] text-[#525252] self-start text-shadow-100 sm:mb-[100px] mb-[50px]'>
          Ready to continue crafting your unique story?
        </p>
        <GoogleSignin/>
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
                  <FormLabel className='text-[#17161B] sm:text-[26px] text-[24px] font-500' htmlFor='username'>
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='email'
                      id='username'
                      placeholder=''
                      className='rounded-[8px] border-[2px] border-[#D4D3D8] bg-[#fff]'
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
                  <FormLabel className='text-[#17161B] sm:text-[26px] text-[24px] font-500' htmlFor='password'>
                    Password
                  </FormLabel>
                  {!hidePassword ? (
                    <EyeOff
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-12 cursor-pointer'
                    />
                  ) : (
                    <Eye
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-12 cursor-pointer'
                    />
                  )}

                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      id='password'
                      type={hidePassword ? 'password' : 'text'}
                      placeholder=''
                      className='rounded-[8px] border-[2px] border-[#D4D3D8] bg-[#fff]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <Link
              href={'/reset-password'}
              className='small-semibold cursor-pointer self-end text-primary-200 hover:underline'
            >
              Forgot Password?
            </Link>
            <Button className='w-full rounded-[8px] bg-[#8551F3] hover:bg-[#8551F3]' type='submit'>
              Sign in
            </Button>
          </form>
        </Form>
        
        
        <p className='small-regular mt-8 self-center text-black-200'>
          Already a member??&nbsp;
          <Link href={'/signup'} prefetch className='text-primary-200'>
            Sign up
          </Link>
        </p>
      </Panel>
    </section>
  );
}
