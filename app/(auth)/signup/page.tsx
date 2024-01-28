'use client';
import Panel from '@/components/auth/Panel';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { signUpSchema } from '@/lib/validation';
import { userLogin, userSignUp } from '@/query/api';
import { ISigunUpRequest } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function Page() {
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.matchMedia('(max-width: 768px)').matches);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      password: '',
      email: '',
    },
  });
  const { mutateAsync: handleSignup, isPending: isSignupPending } = useMutation(
    {
      mutationFn: (param: ISigunUpRequest) => userSignUp(param),
      onSuccess: async (_, variables, _contex) => {
        const toast = (await import('sonner')).toast;
        toast.success('Successfully Signup');
        const login_data = await userLogin({
          username: variables.email,
          password: variables.password,
        });
        setCookie('token', login_data.access_token, {
          path: '/',
          maxAge: 604800,
        });
        router.push('/welcome/education');
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
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      is_mobile: isMobileDevice,
    });
  }

  return (
    <>
      <Panel>
        <div className='flex max-w-[600px] flex-col'>
          <h1 className='self-center text-[28px] font-[500] sm:text-[42px]'>
            Create Your Account
          </h1>
          <p className='title-semibold mb-[30px] self-start text-left font-[400] text-[#525252] sm:mb-[60px] sm:text-[18px]'>
            Unlock the potential of your personal statement with Prodream!
          </p>
          <GoogleSignin label='Sign up with Google' />
          <div className='flex-center relative my-10'>
            <Separator orientation='horizontal' className='bg-shadow-border' />
            <p className='small-regular absolute bg-white px-2 text-shadow-100'>
              Or Sign up with email
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-y-6'
            >
              <div className='flex-between flex gap-x-4'>
                <FormField
                  control={form.control}
                  name='first_name'
                  render={({ field }) => (
                    <FormItem className='relative w-1/2'>
                      <FormLabel
                        className='sm:title-semibold title-semibold '
                        htmlFor='first_name'
                      >
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='first_name'
                          id='first_name'
                          placeholder=''
                          className='rounded-[8px] border border-[#D4D3D8] bg-[#fff]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='last_name'
                  render={({ field }) => (
                    <FormItem className='relative w-1/2'>
                      <FormLabel
                        className='sm:title-semibold title-semibold '
                        htmlFor='last_name'
                      >
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete='last_name'
                          id='last_name'
                          placeholder=''
                          className='rounded-[8px] border border-[#D4D3D8] bg-[#fff]'
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
                name='email'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel
                      className=' sm:title-semibold title-semibold '
                      htmlFor='username'
                    >
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='email'
                        type='email'
                        id='username'
                        placeholder='e.g hey@writingpal.ai'
                        className='rounded-[8px] border border-[#D4D3D8] bg-[#fff]'
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
                      className=' sm:title-semibold title-semibold '
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
                        placeholder='Must be at least 8 characters'
                        className='rounded-[8px] border border-[#D4D3D8] bg-[#fff]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                  </FormItem>
                )}
              />

              <p className='small-regular cursor-pointer self-start text-black-400'>
                By Continuing, you agree to
                <Link href={'/'} className='text-auth-primary'>
                  &nbsp;Applify AI&apos;s Term of Service
                </Link>
                &nbsp; and
                <Link href={'/'} className='text-auth-primary'>
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
          <p className='small-regular mt-4 self-center text-black-200'>
            Already a member?&nbsp;
            <Link href={'/login'} className='small-semibold text-auth-primary'>
              Log in
            </Link>
          </p>
        </div>
      </Panel>
      <div className='relative hidden h-full w-1/2 bg-white sm:flex'>
        <Image
          src='/auth/auth.png'
          alt='logo'
          fill
          sizes='(max-width: 600px) 100vw, 50vw'
        />
      </div>
    </>
  );
}
