import { useEditorCommand } from '@/components/editor/hooks/useEditorCommand';
import { ICitationType } from '@/types';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { createCitation, createGoogleCiation, updateCitation } from './api';

export const useUpdateCitation = () => {
  const tSuccess = useTranslations('Success');
  const updateCitationItem = useCitation((state) => state.updateCitationItem);
  return useMutation({
    mutationFn: (params: {
      citation_type: ICitationType;
      id: string;
      data: any;
    }) => updateCitation(params),
    onSuccess: async (_data, variables) => {
      const toast = (await import('sonner')).toast;
      const toastInfo = tSuccess('Citation_Updated_successfully');
      toast.success(toastInfo);
      updateCitationItem({
        type: variables.citation_type,
        data: variables.data,
      });
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useCreateCustomCitation = () => {
  const trans = useTranslations('Editor');

  const appendInDocCitationIds = useCitation(
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
          ...data,
        },
      });
      const toast = (await import('sonner')).toast;

      const toastInfo = trans('Citation.Citation_created_successfully');

      toast.success(toastInfo);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useCreateCitation = () => {
  const trans = useTranslations('Editor');

  const appendInDocCitationIds = useCitation(
    (state) => state.appendInDocCitationIds
  );
  return useMutation({
    mutationFn: (params: {
      url: string;
      citation_id: string;
      snippet: string;
      citation_count: number;
      in_text_pos: number;
      document_id: string;
    }) => createGoogleCiation(params),
    onSuccess: async (data) => {
      await appendInDocCitationIds({
        type: 'Journal',
        data: {
          ...data,
        },
      });
      const toast = (await import('sonner')).toast;

      const toastInfo = trans('Citation.Citation_created_successfully');

      toast.success(toastInfo);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useCiteToDoc = () => {
  const trans = useTranslations('Editor');
  const editor = useAIEditor((state) => state.editor_instance);
  const { insertCitation } = useEditorCommand(editor!);
  const appendInTextCitationIds = useCitation(
    (state) => state.appendInTextCitationIds
  );
  return useMutation({
    mutationFn: (params: {
      url: string;
      citation_id: string;
      snippet: string;
      citation_count: number;
      in_text_pos: number;
      document_id: string;
    }) => createGoogleCiation(params),
    onSuccess: async (data) => {
      const { selection } = editor!.state;
      const { from, to, anchor } = selection;
      await appendInTextCitationIds(
        {
          type: 'Journal',
          data,
        },
        false
      );

      insertCitation(data.id, anchor, from, to);
      const toast = (await import('sonner')).toast;
      const toastInfo = trans('Citation.Citation_created_successfully');

      toast.success(toastInfo);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
