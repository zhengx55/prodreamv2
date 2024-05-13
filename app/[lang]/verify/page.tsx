'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import useRensendEmail from './hooks/useResend';

export default function Page({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const { mutateAsync: handleResend } = useRensendEmail();
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
            Congratulations! Your email is successfully verified.
          </p>
          <Link passHref href={'/login'} className='self-center'>
            <Button
              role='button'
              className='w-max self-center border border-violet-500'
              variant={'ghost'}
            >
              Back to log in
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
            Verification timed out, please resend verification link.
          </p>
          <div className='flex gap-x-3 self-center'>
            <Link passHref href={'/login'} className='self-center'>
              <Button
                role='button'
                className='w-max self-center border border-violet-500'
                variant={'ghost'}
              >
                Return
              </Button>
            </Link>
            <Button
              onClick={resend}
              role='button'
              className='w-max self-center'
            >
              Resend Link
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
