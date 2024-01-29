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
import { signUpSchema } from '@/lib/validation';
import { userLogin, userSignUp } from '@/query/api';
import { ISigunUpRequest } from '@/query/type';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
const SignUpForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const posthog = usePostHog();
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
        const user_id = JSON.parse(atob(login_data.access_token.split('.')[1]))
          .subject.user_id;
        posthog.identify(user_id);
        setCookie('token', login_data.access_token, {
          path: '/',
          maxAge: 604800,
          secure: true,
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
  );
};
export default SignUpForm;
