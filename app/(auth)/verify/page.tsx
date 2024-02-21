'use client';
import { Button } from '@/components/ui/button';
import { resendEmail } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export default function Page({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const { mutateAsync: handleResend } = useMutation({
    mutationFn: () => resendEmail(),
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Email sent successfully');
    },
    onError: async () => {
      const { toast } = await import('sonner');
      toast.error('Email sent error, please try again later');
    },
  });
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
          <p className='base-regular text-doc-font'>
            Congratulations! Your email is successfully verified.
          </p>
          <Link passHref href={'/login'} className='self-center'>
            <Button
              role='button'
              className='w-max self-center border border-doc-primary'
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
          <p className='base-regular text-doc-font'>
            Verification timed out, please resend verification link.
          </p>
          <div className='flex gap-x-3 self-center'>
            <Link passHref href={'/login'} className='self-center'>
              <Button
                role='button'
                className='w-max self-center border border-doc-primary'
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
