import { useEditorCommand } from '@/components/editor/hooks/useEditorCommand';
import { ICitationType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCitation, getReferralCount, saveDoc } from './api';

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
      await saveDoc({
        id: variables.document_id,
        citation_candidate_ids: [...inDocCitationIds, data],
      });
      appendInDocCitationIds(data);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useCiteToDoc = () => {
  const editor = useAIEditor((state) => state.editor_instance);
  const { insertCitation } = useEditorCommand(editor!);
  const appendInTextCitation = useAIEditor(
    (state) => state.appendInTextCitation
  );
  const appendInTextCitationIds = useAIEditor(
    (state) => state.appendInTextCitationIds
  );
  const inTextCitationIds = useAIEditor((state) => state.inTextCitationIds);
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
      await saveDoc({
        id: variables.document_id,
        citation_ids: [...inTextCitationIds, data],
      });
      appendInTextCitationIds(data);
      if (
        variables.citation_data.contributors.length > 0 &&
        variables.citation_data.contributors[0].last_name
      ) {
        insertCitation(variables.citation_data.contributors[0].last_name);
      }
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
