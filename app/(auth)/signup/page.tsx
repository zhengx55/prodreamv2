'use client';
import Panel from '@/components/auth/Panel';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Image from 'next/image';

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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';

export default function Page() {
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: '',
      email: '',
      firstname: '',
      lastname: '',
    },
  });
  const { mutateAsync: handleSignup, isPending: isSignupPending } = useMutation(
    {
      mutationFn: (param: ISigunUpRequest) => userSignUp(param),
      onSuccess: async (_, variables, _contex) => {
        toast.success('Successfully Signup');
        const login_data = await userLogin({
          firstname: variables.firstname,
          lastname: variables.lastname,
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
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className='overflow-hidden flex-center flex-1'>
      <div className='w-1/2 bg-[#fff]'>
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
        <h1 className='text-[48px] font-[600] self-start'>Create Your Account</h1>
        <p className='text-[24px] font-[400] text-[#525252] self-start text-left text-shadow-100 mb-[60px]'>
          Unlock the potential of your personal statement with QuickApply!
        </p>
        <GoogleSignin />
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
            <div className='flex flex-between'>
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel className='text-[#17161B] text-[26px] font-500' htmlFor='firstname'>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='firstname'
                        id='firstname'
                        placeholder=''
                        className='rounded-[8px] border-[2px] border-[#D4D3D8] bg-[#fff]'
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
                    <FormLabel className='text-[#17161B] text-[26px] font-500' htmlFor='lastname'>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='lastname'
                        id='lastname'
                        placeholder=''
                        className='rounded-[8px] border-[2px] border-[#D4D3D8] bg-[#fff]'
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
                  <FormLabel className='text-[#17161B] text-[26px] font-500' htmlFor='username'>
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='email'
                      type='email'
                      id='username'
                      placeholder='e.g hey@writingpal.ai'
                      className='rounded-[8px] border-[2px] border-[#D4D3D8] bg-[#fff]'
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
                  <FormLabel className='text-[#17161B] text-[26px] font-500' htmlFor='password'>
                    Create a Password
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
                      placeholder='Must be at least 8 characters'
                      className='rounded-[8px] border-[2px] border-[#D4D3D8] bg-[#fff]'
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
              className='w-full rounded-[8px] bg-[#8551F3] hover:bg-[#8551F3]'
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
          <Link href={'/login'} className='text-primary-200'>
            Log in
          </Link>
        </p>
      </Panel>
    </section>
  );
}
