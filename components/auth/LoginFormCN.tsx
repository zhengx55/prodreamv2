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
import { createVerificationCodeLoginSchemaCN } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import {
  sendVerificationCodeByPhoneCN,
  loginWithPhoneNumberAndCodeCN,
  registerUserWithPhoneNumberCN,
} from '@/query/api';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Spacer from '../root/Spacer';
import * as z from 'zod';

// !该组件为CN独有的验证码登录
const LoginFormCN = () => {
  const trans = useTranslations('Auth');
  const router = useRouter();
  const VerificationCodeLoginSchema =
    createVerificationCodeLoginSchemaCN(trans);
  const [_cookies, setCookie] = useCookies(['token']);
  const { lang } = useParams();
  const [readAndAgree, setReadAndAgree] = useState(false);
  const [verifyWait, setVerifyWait] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const { mutateAsync: handleSendVerification } = useMutation({
    mutationFn: (params: { phone_number: string }) =>
      sendVerificationCodeByPhoneCN(params),
    onSuccess: () => {
      const toastInfo = '验证码已发送';
      toast.success(toastInfo);
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof VerificationCodeLoginSchema>>({
    resolver: zodResolver(VerificationCodeLoginSchema),
    defaultValues: {
      phone: '',
      verification_code: '',
    },
  });

  async function handleSentVerificationPhoneNumber() {
    const { phone } = form.getValues();
    if (!phone) {
      const toastInfo = '请输入手机号';
      toast.error(toastInfo);
      return;
    }
    await handleSendVerification({ phone_number: phone });
  }

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

  const { mutateAsync: handleRegister } = useMutation({
    mutationFn: (params: {
      phone_number: string;
      verification_code: string;
    }) => {
      const paramObj = {
        phone_number: `+86${params.phone_number}`,
        code: params.verification_code,
      };
      return registerUserWithPhoneNumberCN(paramObj);
    },
    onSuccess: (loginData) => {
      setCookie('token', loginData.access_token, {
        path: '/',
        maxAge: 604800,
        secure: true,
        sameSite: 'lax',
      });
      router.push(`/${lang}/onboard`);
    },
    onError: async (error) => {
      if (error.message === 'User already exists') {
        const { phone, verification_code } = form.getValues();
        const loginData = await loginWithPhoneNumberAndCodeCN({
          phone_number: phone,
          code: verification_code,
        });
        setCookie('token', loginData.access_token, {
          path: '/',
          maxAge: 604800,
          secure: true,
          sameSite: 'lax',
        });
        router.push('/editor');
      } else {
        toast.error(error.message);
      }
    },
  });

  async function onSubmit(values: z.infer<typeof VerificationCodeLoginSchema>) {
    const { phone, verification_code } = values;
    await handleRegister({
      phone_number: phone,
      verification_code: verification_code,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-6'
      >
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormControl>
                <Input
                  autoComplete=''
                  id='phone'
                  placeholder={'请输入手机号'}
                  className='placeholder:base-regular h-12 rounded-md border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />
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
                  onClick={handleSentVerificationPhoneNumber}
                  type='button'
                  className='base-regular h-12 w-[150px] shrink-0 rounded-md border'
                >
                  {verifyWait ? countdown : '发送验证码'}
                </Button>
              </div>
              <FormMessage className='text-xs text-red-400' />
            </FormItem>
          )}
        />
        <Spacer y='20' />
        <div className='flex items-center gap-x-2'>
          <Checkbox
            checked={readAndAgree}
            onCheckedChange={(e: boolean) => setReadAndAgree(e)}
            className='h-4 w-4 border-violet-500'
            id='readAndAgree'
          />
          <label
            className='subtle-regular text-neutral-400'
            htmlFor='readAndAgree'
          >
            我已阅读并同意{' '}
            <a
              href='https://prodream.larksuite.com/docx/QrxPdV4PRoR1G6xAIpUu9rL3srh'
              className='text-blue-600'
            >
              服务协议
            </a>{' '}
            和{' '}
            <a
              href='https://prodream.larksuite.com/docx/RGZCda4XkosGSkxcz2xua4PxsSc'
              className='text-blue-600'
            >
              隐私协议
            </a>
          </label>
        </div>
        <Button
          className='w-full rounded bg-violet-500'
          type='submit'
          disabled={!readAndAgree}
        >
          {'登录/注册'}
        </Button>
      </form>
    </Form>
  );
};
export default LoginFormCN;
