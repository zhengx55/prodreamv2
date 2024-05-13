import { resendEmail } from '@/query/api';
import { useMutation } from '@tanstack/react-query';

export default function useRensendEmail() {
  return useMutation({
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
}
