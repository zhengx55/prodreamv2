'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '@/components/ui/input';
import { createResetSchemaCN } from '@/lib/validation';
import {
  sendVerificationEmail,
  sendVerificationCodeByPhoneCN,
  userReset,
} from '@/query/api';
import { getCountryPhonePrefixList } from '@/lib/aboutPhonenumber/getCountryPhonePrefixList';
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
import { isMobile } from 'react-device-detect';
import * as z from 'zod';

// !该组件为CN独有的重置密码
const ResetFormCN = () => {
  const transAuth = useTranslations('Auth');
  const [selectedPrefix, setSelectedPrefix] = useState('CN +86');
  const resetSchema = createResetSchemaCN(
    transAuth,
    selectedPrefix.split(' ')[0]
  );
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [verifyWait, setVerifyWait] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();
  const countryPhonePrefixList = getCountryPhonePrefixList(false, true);

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

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
      confirm: '',
      verification_code: '',
    },
  });
  const { mutateAsync: handleReset, isPending: isResetting } = useMutation({
    mutationFn: (param: IResetParams) => userReset(param),
    onSuccess: (_data) => {
      const toastInfo = transAuth('ForgotPassword.Successfully_Reset_Password');
      toast.success(toastInfo);
      router.replace('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    mutateAsync: handleSendVerificationEmail,
    isPending: isSendingVerificationEmail,
  } = useMutation({
    mutationFn: (params: { email: string }) => sendVerificationEmail(params),
    onSuccess: () => {
      const toastInfo = transAuth('ForgotPassword.Checked_your_email');
      toast.success(toastInfo);
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    mutateAsync: handleSendVerificationPhone,
    isPending: isSendingVerificationSMS,
  } = useMutation({
    mutationFn: (params: { phone_number: string }) =>
      sendVerificationCodeByPhoneCN(params),
    onSuccess: () => {
      const toastInfo = transAuth('Schema.Verification_code_sent');
      toast.success(toastInfo);
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSentVerification() {
    const { emailOrPhone } = form.getValues();
    if (!emailOrPhone) {
      const toastInfo = transAuth(
        'ForgotPassword.Please_enter_your_email_address'
      );
      toast.error(toastInfo);
      return;
    } else if (emailOrPhone.includes('@')) {
      await handleSendVerificationEmail({ email: emailOrPhone });
    } else {
      await handleSendVerificationPhone({
        phone_number: `${selectedPrefix.split(' ')[1]}${emailOrPhone}`,
      });
    }
  }

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    try {
      await handleReset({
        emailOrPhone: values.emailOrPhone,
        password: values.password,
        verification_code: values.verification_code,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* I don't know why but the sm:mt-20 is not working on mobile */}
      <div
        className='border-neutral-2000 relative flex w-full items-center gap-x-8 border-b-[2px] sm:w-[600px]'
        style={{ marginTop: isMobile ? '5rem' : '0' }}
      >
        <Button
          disabled
          className={`relative z-10 -mb-[2px] h-max w-max cursor-pointer rounded-none border-b-[2px] border-violet-500 px-0.5 py-1 pb-4 text-xl font-medium text-violet-500 no-underline hover:no-underline disabled:opacity-100 sm:text-[24px]`}
          variant={'ghost'}
        >
          {transAuth('ForgotPassword.Reset_Password')}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
          <div className='mt-20 flex items-center gap-x-2'>
            <Select
              value={selectedPrefix}
              onValueChange={(value) => setSelectedPrefix(value)}
            >
              <SelectTrigger className='h-max w-[116px] gap-x-2 rounded-lg px-4 py-3.5'>
                <SelectValue placeholder={selectedPrefix} />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {Object.entries(countryPhonePrefixList).map(
                  ([code, prefix]) => (
                    <SelectItem key={code} value={`${code} ${prefix}`}>
                      {code} {prefix}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <FormField
              control={form.control}
              name='emailOrPhone'
              render={({ field }) => (
                <FormItem className='relative flex-grow'>
                  <FormControl>
                    <Input
                      autoComplete='email'
                      type='emailOrPhone'
                      id='username'
                      placeholder={transAuth(
                        'ForgotPassword.Input_Email_or_Phone_Number'
                      )}
                      className='placeholder:base-regular h-12 rounded-md border'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                </FormItem>
              )}
            />
          </div>
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
                    placeholder={transAuth('ForgotPassword.Input_New_Password')}
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
                    placeholder={transAuth(
                      'ForgotPassword.Please_input_password_again'
                    )}
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
                      placeholder={transAuth(
                        'ForgotPassword.Please_input_verification_code'
                      )}
                      className='base-regular h-12 rounded-md border'
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={verifyWait}
                    // variant={'ghost'}
                    onClick={handleSentVerification}
                    type='button'
                    className='base-regular h-12 w-[197px] shrink-0 rounded-md border'
                  >
                    {verifyWait
                      ? countdown
                      : transAuth('ForgotPassword.Send_Verification_Code')}
                  </Button>
                </div>
                <FormMessage className='text-xs text-red-400' />
              </FormItem>
            )}
          />
          <Spacer y='70' />
          <p className='text-[14px] text-neutral-400'>
            {transAuth('ForgotPassword.Switch_to')}{' '}
            <a href={`/cn/login`} className='text-blue-600'>
              {transAuth('ForgotPassword.Login_Signup')}
            </a>
          </p>
          <Button className='mt-2 w-full rounded bg-violet-500' type='submit'>
            {isResetting
              ? transAuth('ForgotPassword.Loading')
              : transAuth('ForgotPassword.Reset_Password')}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default ResetFormCN;
