import { ICitationData } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCitation, getReferralCount } from './api';
import { ICitationType } from './type';

export const useReferralsCount = () => {
  return useQuery({
    queryKey: ['referrals_count'],
    queryFn: () => getReferralCount(),
  });
};

export const useCreateCitation = () => {
  return useMutation({
    mutationFn: (params: {
      citation_type: ICitationType;
      citation_data: ICitationData;
      document_id: string;
    }) => createCitation(params),
    onSuccess: (data) => {},
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
