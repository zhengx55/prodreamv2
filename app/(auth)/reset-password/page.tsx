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
import { useRouter } from 'next/navigation';
import { IResetParams } from '@/query/type';
import { toast } from 'sonner';
import Image from 'next/image';

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
    onError: (error) => {},
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
    <section className='overflow-hidden flex-center flex-1'>
      <Panel>
        <h1 className='sm:text-[42px] text-[28px] font-[600] self-start'>Reset Password</h1>
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
                  <FormLabel className='text-[#17161B] sm:text-[20px] text-[24px] font-500' htmlFor='email'>
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
                  <FormLabel className='text-[#17161B] sm:text-[20px] text-[24px] font-500' htmlFor='password'>
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
                  <FormLabel className='text-[#17161B] sm:text-[20px] text-[24px] font-500' htmlFor='confirm'>
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
                    className='text-[#17161B] sm:text-[20px] text-[24px] font-500'
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
                      className='w-[150px] shrink-0 rounded-[8px] border-[#8551F3] border-[2px] bg-[#fff] text-[#8551F3] hover:bg-[#8551F3] hover:text-[#fff]'
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
            <Button className='w-full rounded-[8px] bg-[#8551F3] hover:bg-[#8551F3]' type='submit'>
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
      <div className='hidden sm:block w-1/2 bg-[#fff]'>
        <Image
          src='/auth/reset_bg.png'
          width={960}
          height={1129}
          alt='logo'
          className='h-auto w-full'
          priority
        />
      </div>
    </section>
  );
}
