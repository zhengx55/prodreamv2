import { useEditorCommand } from '@/components/editor/hooks/useEditorCommand';
import { ICitationType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { createCitation } from './api';

export const useCreateCitation = () => {
  const appendInDocCitationIds = useAIEditor(
    (state) => state.appendInDocCitationIds
  );
  return useMutation({
    mutationFn: (params: {
      citation_type: ICitationType;
      citation_data: any;
      document_id: string;
    }) => createCitation(params),
    onSuccess: async (data, variables) => {
      // 根据Id 获取citation信息
      appendInDocCitationIds(
        {
          type: variables.citation_type,
          data: { ...variables.citation_data, id: data },
        },
        variables.document_id
      );
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useCiteToDoc = (flag?: boolean) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const { insertCitation } = useEditorCommand(editor!);
  const appendInTextCitationIds = useAIEditor(
    (state) => state.appendInTextCitationIds
  );
  const appendInDocCitationIds = useAIEditor(
    (state) => state.appendInDocCitationIds
  );
  return useMutation({
    mutationFn: (params: {
      citation_type: ICitationType;
      citation_data: any;
      document_id: string;
    }) => createCitation(params),
    onSuccess: async (data, variables) => {
      // 根据Id 获取citation信息
      appendInTextCitationIds(
        {
          type: variables.citation_type,
          data: { ...variables.citation_data, id: data },
        },
        variables.document_id
      );
      appendInDocCitationIds(
        {
          type: variables.citation_type,
          data: { ...variables.citation_data, id: data },
        },
        variables.document_id
      );
      insertCitation(
        data,
        variables.citation_data.contributors[0]?.last_name,
        variables.citation_data.publish_date?.year,
        variables.citation_data.article_title,
        variables.citation_data.abstract
      );
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
