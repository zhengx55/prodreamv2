'use client';
import useRensendEmail from '@/app/[lang]/verify/hooks/useResend';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
const ResendButtonCN = () => {
  const { mutate: handleResend } = useRensendEmail();
  const tProfile = useTranslations('Profile');

  return (
    <Button
      role='button'
      onClick={() => handleResend()}
      className='h-max -translate-y-3 rounded-lg px-4'
    >
      {tProfile('Setting.Resend_Link')}
    </Button>
  );
};
export default ResendButtonCN;
