import { resendEmail } from '@/query/api';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';

export default function useResendEmail() {
  const transError = useTranslations('Error');
  const transSuccess = useTranslations('Success');

  return useMutation({
    mutationFn: () => resendEmail(),
    onSuccess: async () => {
      const { toast } = await import('sonner');
      const successInfo = transSuccess('Email_sent_successfully');
      toast.success(successInfo);
    },
    onError: async () => {
      const { toast } = await import('sonner');
      const errorInfo = transError('Email_sent_error_please_try_again_later');
      toast.error(errorInfo);
    },
  });
}
