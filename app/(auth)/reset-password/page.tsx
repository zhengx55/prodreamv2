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
import { resetSchema } from '@/lib/validation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendVerificationEmail, userReset, verifyEmail } from '@/query/api';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { IResetParams } from '@/query/type';

export default function Page() {
  const { toast } = useToast();
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
      toast({
        variant: 'default',
        description: 'Successfully Reset Password',
      });
      router.replace('/login');
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  const { mutateAsync: handleSendVerification } = useMutation({
    mutationFn: (params: { email: string }) => sendVerificationEmail(params),
    onSuccess: () => {
      toast({
        variant: 'default',
        description: 'Checked your email',
      });
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  async function handleSentVerificationEmail() {
    const { email } = form.getValues();
    if (!email) {
      toast({
        description: 'Please enter your email',
        variant: 'destructive',
      });
      return;
    }
    await handleSendVerification({ email });
  }

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    try {
      await verifyEmail({
        email: values.email,
        type: '1',
        code: values.verification_code,
      });
      await handleReset({
        email: values.email,
        password: values.password,
        confirm: values.confirm,
      });
    } catch (error) {}
  }

  return (
    <section className='flex-center flex-1'>
      <Panel>
        <h1 className='h2-bold self-center'>Reset Password</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-6'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='mt-10'>
                  <FormLabel className='text-black-400' htmlFor='email'>
                    Enter the Email Linked to Your Account
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='email'
                      id='email'
                      placeholder=''
                      type='email'
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
                    Enter New Password
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

            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='text-black-400' htmlFor='confirm'>
                    Re-enter New Password
                  </FormLabel>
                  {!hideConfirm ? (
                    <EyeOff
                      onClick={() => setHideConfirm((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-8 cursor-pointer'
                    />
                  ) : (
                    <Eye
                      onClick={() => setHideConfirm((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-8 cursor-pointer'
                    />
                  )}

                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      id='confirm'
                      type={hideConfirm ? 'password' : 'text'}
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
              name='verification_code'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel
                    className='text-black-400'
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
                        className='rounded-2xl border-none bg-shadow-50'
                        {...field}
                      />
                    </FormControl>
                    <Button
                      disabled={verifyWait}
                      onClick={handleSentVerificationEmail}
                      type='button'
                      className='w-[150px] shrink-0 rounded-[20px]'
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
            <Button className='w-full rounded-full' type='submit'>
              Confirm Reset
            </Button>
          </form>
        </Form>
        <p className='small-regular mt-8 self-center text-black-200'>
          Switch to&nbsp;
          <Link href={'/login'} className='text-primary-200'>
            Log in
          </Link>
          &nbsp;or&nbsp;
          <Link href={'/signup'} className='text-primary-200'>
            Sign up
          </Link>
        </p>
      </Panel>
    </section>
  );
}
