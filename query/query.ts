import { useAIEditor } from '@/zustand/store';
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
  const appendInDocCitation = useAIEditor((state) => state.appendInDocCitation);
  const appendInDocCitationIds = useAIEditor(
    (state) => state.appendInDocCitationIds
  );
  const inDocCitationIds = useAIEditor((state) => state.inDocCitationIds);
  return useMutation({
    mutationFn: (params: {
      citation_type: ICitationType;
      citation_data: any;
      document_id: string;
    }) => createCitation(params),
    onSuccess: async (data, variables) => {
      // 根据Id 获取citation信息
      appendInDocCitation(variables.citation_data);
      // save citation ids
      // await saveDoc({
      //   id: variables.document_id,
      //   citation_candidate_ids: inDocCitationIds,
      // });
      appendInDocCitationIds(data);
      const toast = (await import('sonner')).toast;
      toast.success('Citation List Inserted');
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
