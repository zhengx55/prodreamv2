'use client';
import * as z from 'zod';
import Panel from '@/components/auth/Panel';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import GoogleSignin from '@/components/auth/GoogleSignin';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { userSignUp } from '@/query/api';
import { ISigunUpRequest } from '@/query/type';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [hidePassword, setHidePassword] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      password: '',
      email: '',
    },
  });
  const { mutateAsync: handleSignup, isPending: isSignupPending } = useMutation(
    {
      mutationFn: (param: ISigunUpRequest) => userSignUp(param),
      onSuccess: (data) => {
        toast({
          variant: 'default',
          description: 'Successfully Signup',
        });
        router.replace('/login');
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      },
    }
  );
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    await handleSignup({
      first_name: values.firstname,
      last_name: values.lastname,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className='flex-center flex-1'>
      <Panel>
        <h1 className='h2-bold self-center'>Create Your Account</h1>
        <p className='base-regular md:body-normal self-center text-center text-shadow-100 md:text-left'>
          Unlock the potential of your personal statement with QuickApply!
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-6'
          >
            <FormField
              control={form.control}
              name='firstname'
              render={({ field }) => (
                <FormItem className='relative mt-10'>
                  <FormLabel className='text-black-400' htmlFor='username'>
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='firstname'
                      id='firstname'
                      placeholder='e.g Max'
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
              name='lastname'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-black-400' htmlFor='username'>
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='lastname'
                      id='lastname'
                      placeholder='e.g Tang'
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
              name='email'
              render={({ field }) => (
                <FormItem className='relative'>
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
