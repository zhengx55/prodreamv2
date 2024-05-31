'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import useResendEmail from './hooks/useResend';

export default function Page({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const { mutateAsync: handleResend } = useResendEmail();
  const trans = useTranslations('Verify');
  async function resend() {
    await handleResend();
  }
  return (
    <>
      {searchParams.status === 'success' ? (
        <div className='flex flex-col gap-y-6'>
          <Image
            src={'/magic_link/Success.png'}
            width={300}
            height={270}
            priority
            alt='verify_success'
            className='h-auto w-auto self-center'
          />
          <p className='base-regular text-neutral-400'>
            {trans('Congratulations_Your_email_is_successfully_verified')}
          </p>
          <Link passHref href={'/login'} className='self-center'>
            <Button
              role='button'
              className='w-max self-center border border-violet-500'
              variant={'ghost'}
            >
              {trans('Back_to_log_in')}
            </Button>
          </Link>
        </div>
      ) : searchParams.status === 'timeout' ? (
        <div className='flex flex-col gap-y-6'>
          <Image
            src={'/magic_link/Timeout.png'}
            width={300}
            height={270}
            priority
            alt='verify_success'
            className='h-auto w-auto self-center'
          />
          <p className='base-regular text-neutral-400'>
            {trans('Verification_timed_out_please_resend_verification_link')}
          </p>
          <div className='flex gap-x-3 self-center'>
            <Link passHref href={'/login'} className='self-center'>
              <Button
                role='button'
                className='w-max self-center border border-violet-500'
                variant={'ghost'}
              >
                {trans('Return')}
              </Button>
            </Link>
            <Button
              onClick={resend}
              role='button'
              className='w-max self-center'
            >
              {trans('Resend_Link')}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
