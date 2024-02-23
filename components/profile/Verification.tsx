'use client';
import { useRensendEmail } from '@/query/query';
import { useUserInfo } from '@/zustand/store';
import { Secure } from '../root/SvgComponents';
import { Button } from '../ui/button';

const Verification = () => {
  const isGoogle = useUserInfo((state) => state.user.is_google);
  const isVerified = useUserInfo((state) => state.user.is_verified);
  const { mutate: handleResend } = useRensendEmail();

  if (isGoogle || isVerified) return null;
  return (
    <div className='flex h-[140px] w-[700px] flex-col justify-evenly gap-y-0 rounded-lg bg-shadow-50 p-4'>
      <div className='flex gap-x-6'>
        <Secure />
        <h1 className='title-semibold'>Secure Your Account</h1>
      </div>
      <div className='flex-between flex gap-x-16 pl-12'>
        <p className='base-regular text-shadow-100'>
          To secure your account, please verify via the link we sent to your
          email address
        </p>
        <Button
          role='button'
          onClick={() => handleResend()}
          className='h-max rounded-lg px-4'
        >
          Resend Link
        </Button>
      </div>
    </div>
  );
};
export default Verification;
