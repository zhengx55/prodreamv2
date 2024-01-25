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
      appendInDocCitation({
        type: variables.citation_type,
        data: variables.citation_data,
      });
      // save citation ids
      // await saveDoc({
      //   id: variables.document_id,
      //   citation_candidate_ids: inDocCitationIds,
      // });
      appendInDocCitationIds(data);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useCiteToDoc = () => {
  const appendInTextCitation = useAIEditor(
    (state) => state.appendInTextCitation
  );
  const appendInTextCitationIds = useAIEditor(
    (state) => state.appendInTextCitationIds
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
      appendInTextCitation({
        type: variables.citation_type,
        data: variables.citation_data,
      });
      // save citation ids
      // await saveDoc({
      //   id: variables.document_id,
      //   citation_candidate_ids: inDocCitationIds,
      // });
      appendInTextCitationIds(data);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
