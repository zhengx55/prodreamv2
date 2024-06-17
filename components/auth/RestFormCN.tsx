'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createResetSchemaCN } from '@/lib/validation';
import { sendVerificationEmail, userReset } from '@/query/api';
import { IResetParams } from '@/query/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Spacer from '@/components/root/Spacer';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';
import * as z from 'zod';

// !该组件为CN独有的重置密码
const ResetFormCN = () => {
  const trans = useTranslations('Auth');
  const resetSchema = createResetSchemaCN(trans);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [verifyWait, setVerifyWait] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (verifyWait && countdown > 0) {
      // start count down
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
      emailOrPhone: '',
      password: '',
      confirm: '',
      verification_code: '',
    },
  });
  const { mutateAsync: handleReset } = useMutation({
    mutationFn: (param: IResetParams) => userReset(param),
    onSuccess: (_data) => {
      const toastInfo = trans('ForgotPassword.Successfully_Reset_Password');
      toast.success(toastInfo);
      router.replace('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleSendVerification } = useMutation({
    mutationFn: (params: { email: string }) => sendVerificationEmail(params),
    onSuccess: () => {
      const toastInfo = trans('ForgotPassword.Checked_your_email');
      toast.success(toastInfo);
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSentVerificationEmail() {
    const { emailOrPhone } = form.getValues();
    if (!emailOrPhone) {
      const toastInfo = trans('ForgotPassword.Please_enter_your_email_address');
      toast.error(toastInfo);
      return;
    }
    await handleSendVerification({ email: emailOrPhone });
  }

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    try {
      await handleReset({
        email: values.emailOrPhone,
        password: values.password,
        verification_code: values.verification_code,
      });
    } catch (error) {}
  }

  return (
    <>
      <div className='relative flex w-full items-center gap-x-8 border-b-[2px] border-neutral-200 sm:w-[600px]'>
        <Button
          disabled
          className={` relative z-10  -mb-[2px] h-max w-max cursor-pointer rounded-none border-b-[2px] border-violet-500 px-0.5 py-1 pb-4 text-xl font-medium text-violet-500 no-underline hover:no-underline disabled:opacity-100 sm:text-[24px]`}
          variant={'ghost'}
        >
          {'重置密码'}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
          <FormField
            control={form.control}
            name='emailOrPhone'
            render={({ field }) => (
              <FormItem className='mt-20'>
                <FormControl>
                  <Input
                    autoComplete='email'
                    id='email'
                    placeholder={'输入邮箱或手机号'}
                    type='email'
                    className='base-regular h-12 rounded-md border'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-400' />
              </FormItem>
            )}
          />
          <Spacer y='6' />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                {!hidePassword ? (
                  <EyeOff
                    onClick={() => setHidePassword((prev) => !prev)}
                    size={20}
                    className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                  />
                ) : (
                  <Eye
                    onClick={() => setHidePassword((prev) => !prev)}
                    size={20}
                    className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                  />
                )}
                <FormControl>
                  <Input
                    autoComplete='current-password'
                    id='password'
                    type={hidePassword ? 'password' : 'text'}
                    placeholder={'请输入新的密码'}
                    className='base-regular h-12 rounded-md border'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-400' />
              </FormItem>
            )}
          />
          <Spacer y='6' />
          <FormField
            control={form.control}
            name='confirm'
            render={({ field }) => (
              <FormItem className='relative'>
                {!hideConfirm ? (
                  <EyeOff
                    onClick={() => setHideConfirm((prev) => !prev)}
                    size={20}
                    className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                  />
                ) : (
                  <Eye
                    onClick={() => setHideConfirm((prev) => !prev)}
                    size={20}
                    className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                  />
                )}
                <FormControl>
                  <Input
                    autoComplete='current-password'
                    id='confirm'
                    type={hideConfirm ? 'password' : 'text'}
                    placeholder={'请再次输入密码'}
                    className='base-regular h-12 rounded-md border'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-400' />
              </FormItem>
            )}
          />
          <Spacer y='12' />
          <FormField
            control={form.control}
            name='verification_code'
            render={({ field }) => (
              <FormItem className='relative'>
                <div className='flex gap-x-2'>
                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      id='verification_code'
                      type='text'
                      placeholder={'请输入验证码'}
                      className='base-regular h-12 rounded-md border'
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={verifyWait}
                    // variant={'ghost'}
                    onClick={handleSentVerificationEmail}
                    type='button'
                    className='base-regular h-12 w-[197px] shrink-0 rounded-md border'
                  >
                    {verifyWait ? countdown : '发送验证码'}
                  </Button>
                </div>
                <FormMessage className='text-xs text-red-400' />
              </FormItem>
            )}
          />
          <Spacer y='70' />
          <p className='text-[14px] text-neutral-400'>
            {'切换至'}{' '}
            <a href={`/cn/login`} className='text-blue-600'>
              {'登录/注册'}
            </a>
          </p>
          <Button className='mt-2 w-full rounded bg-violet-500' type='submit'>
            {'重置密码'}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default ResetFormCN;
