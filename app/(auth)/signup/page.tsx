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
import { useAppDispatch } from '@/store/storehooks';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';

export default function Page() {
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useAppDispatch();
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
        toast.success('Successfully Signup');
        const login_data = await userLogin({
          username: variables.email,
          password: variables.password,
        });
        setCookie('token', login_data.access_token, {
          path: '/',
          maxAge: 604800,
        });
        router.push('/welcome/info');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    await handleSignup({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className='flex-center flex-1'>
      <Panel>
        <h1 className='h3-bold self-center'>Create Your Account</h1>
        <p className='small-regular self-center text-center text-shadow-100'>
          Unlock the potential of your personal statement with QuickApply!
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='relative mt-10'>
                  <FormLabel className='text-black-400' htmlFor='username'>
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='email'
                      type='email'
                      id='username'
                      placeholder='e.g hey@writingpal.ai'
                      className='rounded-2xl border-none bg-shadow-50'
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
                  <FormLabel className='text-black-400' htmlFor='password'>
                    Create a Password
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
                      placeholder='Must be at least 8 characters'
                      className='rounded-2xl border-none bg-shadow-50'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                </FormItem>
              )}
            />

            <p className='small-regular cursor-pointer self-start text-black-400'>
              By Continuing, you agree to
              <Link href={'/'} className='text-primary-200'>
                &nbsp;Applify AI&apos;s Term of Service
              </Link>
              &nbsp; and
              <Link href={'/'} className='text-primary-200'>
                &nbsp;Privacy Policy
              </Link>
            </p>
            <Button
              disabled={isSignupPending}
              className='w-full gap-x-2 rounded-full'
              type='submit'
            >
              {isSignupPending && (
                <Loader2 className='animate-spin text-white' size={22} />
              )}
              Sign up
            </Button>
          </form>
        </Form>
        <div className='flex-center relative my-10'>
          <Separator orientation='horizontal' className='bg-shadow-border' />
          <p className='small-regular absolute bg-white px-2 text-shadow-100'>
            Or Sign up with
          </p>
        </div>
        <GoogleSignin />
        <p className='small-regular mt-4 self-center text-black-200'>
          Already have an account?&nbsp;
          <Link href={'/login'} className='text-primary-200'>
            Log in
          </Link>
        </p>
      </Panel>
    </section>
  );
}
