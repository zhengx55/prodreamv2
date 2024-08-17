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
import { createResetSchema } from '@/lib/validation';
import { sendVerificationEmail, userReset } from '@/query/api';
import { IResetParams } from '@/query/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const ResetForm = () => {
  const trans = useTranslations('Auth');
  const resetSchema = createResetSchema(trans);
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
      email: '',
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
    const { email } = form.getValues();
    if (!email) {
      const toastInfo = trans('ForgotPassword.Please_enter_your_email_address');
      toast.error(toastInfo);
      return;
    }
    await handleSendVerification({ email });
  }

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    try {
      await handleReset({
        emailOrPhone: values.email,
        password: values.password,
        verification_code: values.verification_code,
      });
    } catch (error) {}
  }
  return (
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
              <FormControl>
                <Input
                  autoComplete='email'
                  id='email'
                  placeholder={trans('ForgotPassword.FormEmail')}
                  type='email'
                  className='base-regular h-12 rounded-md border'
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
                  placeholder={trans('ForgotPassword.FormPassword')}
                  className='base-regular h-12 rounded-md border'
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
                  placeholder={trans('ForgotPassword.FormConfirm')}
                  className='base-regular h-12 rounded-md border'
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
              <div className='flex gap-x-2'>
                <FormControl>
                  <Input
                    autoComplete='current-password'
                    id='verification_code'
                    type='text'
                    placeholder={trans('ForgotPassword.Verification')}
                    className='base-regular h-12 rounded-md border'
                    {...field}
                  />
                </FormControl>
                <Button
                  disabled={verifyWait}
                  variant={'ghost'}
                  onClick={handleSentVerificationEmail}
                  type='button'
                  className='base-regularw-[150px] h-12 shrink-0 rounded-md border border-violet-500 text-violet-500'
                >
                  {verifyWait
                    ? countdown
                    : trans('ForgotPassword.VerificationBtn')}
                </Button>
              </div>
              <FormMessage className='text-xs text-red-400' />
            </FormItem>
          )}
        />
        <Button className='w-full rounded bg-violet-500' type='submit'>
          {trans('ForgotPassword.Button')}
        </Button>
      </form>
    </Form>
  );
};
export default ResetForm;
