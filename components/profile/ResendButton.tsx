'use client';
import useRensendEmail from '@/app/[lang]/verify/hooks/useResend';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
const ResendButton = () => {
  const { mutate: handleResend } = useRensendEmail();
  const t = useTranslations('Profile');

  return (
    <Button
      role='button'
      onClick={() => handleResend()}
      className='h-max rounded-lg px-4'
    >
      {t('Setting.Resend_Link')}
    </Button>
  );
};
export default ResendButton;
