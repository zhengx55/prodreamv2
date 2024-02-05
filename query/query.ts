import { useEditorCommand } from '@/components/editor/hooks/useEditorCommand';
import { DocSortingMethods, ICitationType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCitation, getDocs } from './api';

export const useDocumentList = (
  searchTerm: string,
  sortingMethod: DocSortingMethods
) => {
  return useQuery({
    queryKey: ['document_history_list', searchTerm],
    queryFn: () => getDocs(0, 15, searchTerm ?? undefined),
    refetchOnMount: true,
    select: (data) =>
      sortingMethod === 'title'
        ? {
            ...data,
            list: data.list.sort((a, b) => a.title.localeCompare(b.title)),
          }
        : {
            ...data,
            list: data.list.sort((a, b) => b.update_time - a.update_time),
          },
  });
};

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
      await appendInDocCitationIds({
        type: variables.citation_type,
        data: {
          ...variables.citation_data,
          id: data,
          document_id: variables.document_id,
        },
      });
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
  return useMutation({
    mutationFn: (params: {
      citation_type: ICitationType;
      citation_data: any;
      document_id: string;
    }) => createCitation(params),
    onSuccess: async (data, variables) => {
      await appendInTextCitationIds({
        type: variables.citation_type,
        data: {
          ...variables.citation_data,
          id: data,
          document_id: variables.document_id,
        },
      });
      insertCitation(data);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
