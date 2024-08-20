'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { resetPassword, sendVerificationEmail } from './server_actions';

const ResetForm = () => {
  const trans = useTranslations('Auth');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [verifyWait, setVerifyWait] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const emailRef = useRef<HTMLInputElement>(null);
  const { replace } = useRouter();
  const { execute, isExecuting, result } = useAction(resetPassword, {
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Password reset successful');
      replace('/login');
    },
  });
  const { executeAsync: sendCode, isExecuting: isSending } = useAction(
    sendVerificationEmail,
    {
      onSuccess: async () => {
        const { toast } = await import('sonner');
        const toastInfo = 'Verification code has been sent to your email';
        toast.success(toastInfo);
        setVerifyWait(true);
        setCountdown(60);
      },
      onError: async (error) => {
        const { toast } = await import('sonner');
        toast.error(
          error.error.validationErrors?.fieldErrors?.email?.[0] ??
            'An error occurred'
        );
      },
    }
  );
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (verifyWait && countdown > 0) {
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

  return (
    <form action={execute} className='flex flex-col gap-y-6'>
      <div className='relative space-y-2'>
        <label htmlFor='email' className='text-xl font-semibold text-zinc-800'>
          Email
        </label>
        <Input
          ref={emailRef}
          autoComplete='email'
          id='email'
          name='email'
          required
          type='email'
          className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
        />
        {result.validationErrors?.fieldErrors.email && (
          <p className='absolute -bottom-5 text-xs text-red-500'>
            {result.validationErrors?.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div className='relative space-y-2'>
        <label
          htmlFor='password'
          className='text-xl font-semibold text-zinc-800'
        >
          {trans('ForgotPassword.FormPassword')}
        </label>
        {!hidePassword ? (
          <EyeOff
            onClick={() => setHidePassword((prev) => !prev)}
            size={22}
            className='absolute bottom-4 right-2 cursor-pointer text-neutral-400'
          />
        ) : (
          <Eye
            onClick={() => setHidePassword((prev) => !prev)}
            size={22}
            className='absolute bottom-4 right-2 cursor-pointer text-neutral-400'
          />
        )}
        <Input
          autoComplete='current-password'
          id='password'
          name='password'
          required
          type={hidePassword ? 'password' : 'text'}
          className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
        />
        {result.validationErrors?.fieldErrors.password && (
          <p className='absolute -bottom-5 text-xs text-red-500'>
            {result.validationErrors?.fieldErrors.password[0]}
          </p>
        )}
      </div>

      <div className='relative space-y-2'>
        <label
          htmlFor='confirm'
          className='text-xl font-semibold text-zinc-800'
        >
          {trans('ForgotPassword.FormConfirm')}
        </label>
        {!hideConfirm ? (
          <EyeOff
            onClick={() => setHideConfirm((prev) => !prev)}
            size={22}
            className='absolute bottom-4 right-2 cursor-pointer text-neutral-400'
          />
        ) : (
          <Eye
            onClick={() => setHideConfirm((prev) => !prev)}
            size={22}
            className='absolute bottom-4 right-2 cursor-pointer text-neutral-400'
          />
        )}
        <Input
          autoComplete='current-password'
          id='confirm'
          required
          name='confirm'
          type={hideConfirm ? 'password' : 'text'}
          className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
        />
        {result.validationErrors?.fieldErrors.confirm && (
          <p className='absolute -bottom-5 text-xs text-red-500'>
            {result.validationErrors?.fieldErrors.confirm[0]}
          </p>
        )}
      </div>

      <div className='relative space-y-2'>
        <label
          htmlFor='verification_code'
          className='text-xl font-semibold text-zinc-800'
        >
          {trans('ForgotPassword.Verification')}
        </label>
        <div className='flex gap-x-2'>
          <Input
            autoComplete='current-password'
            id='verification_code'
            name='verification_code'
            required
            type='text'
            className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
          />

          <Button
            disabled={verifyWait || isExecuting || isSending}
            variant={'secondary'}
            type='button'
            onClick={async () => {
              await sendCode({ email: emailRef.current?.value ?? '' });
            }}
            className='base-regular h-[60px] shrink-0'
          >
            {verifyWait ? countdown : trans('ForgotPassword.VerificationBtn')}
          </Button>
        </div>
        {result.validationErrors?.fieldErrors.verification_code && (
          <p className='absolute -bottom-5 text-xs text-red-500'>
            {result.validationErrors?.fieldErrors.verification_code[0]}
          </p>
        )}
      </div>

      <Button
        disabled={isExecuting}
        className='h-[60px] w-full rounded-lg font-semibold'
        type='submit'
      >
        Confirm Reset
      </Button>
    </form>
  );
};
export default ResetForm;
