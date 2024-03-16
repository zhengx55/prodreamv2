'use client';
import { useRensendEmail } from '@/query/query';
import { Button } from '../ui/button';
const ResendButton = () => {
  const { mutate: handleResend } = useRensendEmail();

  return (
    <Button
      role='button'
      onClick={() => handleResend()}
      className='h-max rounded-lg px-4'
    >
      Resend Link
    </Button>
  );
};
export default ResendButton;
