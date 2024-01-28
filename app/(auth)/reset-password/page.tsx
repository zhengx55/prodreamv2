'use client';
import Panel from '@/components/auth/Panel';
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
import { resetSchema } from '@/lib/validation';
import { sendVerificationEmail, userReset } from '@/query/api';
import { IResetParams } from '@/query/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export default function Page() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [verifyWait, setVerifyWait] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (verifyWait && countdown > 0) {
      // 启动倒计时
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [verifyWait, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setVerifyWait(false);
    }
  }, [countdown]);

  const router = useRouter();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      verification_code: '',
    },
  });
  const { mutateAsync: handleReset } = useMutation({
    mutationFn: (param: IResetParams) => userReset(param),
    onSuccess: (_data) => {
      toast.success('Successfully Reset Password');
      router.replace('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleSendVerification } = useMutation({
    mutationFn: (params: { email: string }) => sendVerificationEmail(params),
    onSuccess: () => {
      toast.success('Checked your email');
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSentVerificationEmail() {
    const { email } = form.getValues();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    await handleSendVerification({ email });
  }

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    try {
      await handleReset({
        email: values.email,
        password: values.password,
        verification_code: values.verification_code,
      });
    } catch (error) {}
  }

  return (
    <>
      <Panel>
        <div className='flex w-full flex-col sm:w-[580px]'>
          <h1 className='self-center text-[28px] font-[500] sm:text-[42px]'>
            Reset Password
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-y-6'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='mt-20'>
                    <FormLabel
                      className='title-semibold sm:title-semibold text-[#17161B]'
                      htmlFor='email'
                    >
                      Enter the Email Linked to Your Account
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete='email'
                        id='email'
                        placeholder=''
                        type='email'
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
                    <FormLabel
                      className=' title-semibold sm:title-semibold text-[#17161B]'
                      htmlFor='password'
                    >
                      Enter New Password
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
                name='confirm'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel
                      className=' title-semibold sm:title-semibold text-[#17161B]'
                      htmlFor='confirm'
                    >
                      Re-enter New Password
                    </FormLabel>
                    {!hideConfirm ? (
                      <EyeOff
                        onClick={() => setHideConfirm((prev) => !prev)}
                        size={22}
                        className='absolute right-2 top-10 cursor-pointer'
                      />
                    ) : (
                      <Eye
                        onClick={() => setHideConfirm((prev) => !prev)}
                        size={22}
                        className='absolute right-2 top-10 cursor-pointer'
                      />
                    )}

                    <FormControl>
                      <Input
                        autoComplete='current-password'
                        id='confirm'
                        type={hideConfirm ? 'password' : 'text'}
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
                name='verification_code'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel
                      className=' title-semibold sm:title-semibold text-[#17161B]'
                      htmlFor='verification_code'
                    >
                      Verification
                    </FormLabel>
                    <div className='flex gap-x-2'>
                      <FormControl>
                        <Input
                          autoComplete='current-password'
                          id='verification_code'
                          type='text'
                          placeholder=''
                          className='rounded-[8px] border-[2px] border-[#D4D3D8] bg-[#fff]'
                          {...field}
                        />
                      </FormControl>
                      <Button
                        disabled={verifyWait}
                        onClick={handleSentVerificationEmail}
                        type='button'
                        className='w-[150px] shrink-0 rounded-[8px] border-[2px] border-[#8551F3] bg-[#fff] text-[#8551F3] hover:bg-[#8551F3] hover:text-[#fff]'
                      >
                        {verifyWait ? (
                          <>
                            Resend in&nbsp;
                            {countdown}
                          </>
                        ) : (
                          'Send Verification'
                        )}
                      </Button>
                    </div>

                    <FormMessage className='text-xs text-red-400' />
                  </FormItem>
                )}
              />
              <Button className='w-full rounded bg-auth-primary' type='submit'>
                Confirm Reset
              </Button>
            </form>
          </Form>
          <p className='small-regular mt-8 self-center text-black-200'>
            Switch to&nbsp;
            <Link href={'/login'} className='text-auth-primary'>
              Log in
            </Link>
            &nbsp;or&nbsp;
            <Link href={'/signup'} className='text-auth-primary'>
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
