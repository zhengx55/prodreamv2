import { useEditorCommand } from '@/components/editor/hooks/useEditorCommand';
import { DocSortingMethods, ICitationType } from '@/types';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useCookies } from 'react-cookie';
import { v4 } from 'uuid';
import {
  createCitation,
  getDocDetail,
  getDocs,
  getUserInfo,
  getUserMemberShip,
  purchaseMembership,
  updateUserInfo,
  userLogin,
} from './api';
import { UserTrackData } from './type';

export const useMembershipInfo = () => {
  return useQuery({
    queryKey: ['membership'],
    queryFn: () => getUserMemberShip(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMutationMembershio = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (params: { product_id: string; url: string }) =>
      purchaseMembership(params),
    onSuccess: (data) => {
      router.push(data);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useDocumentDetail = (id: string) => {
  return useQuery({
    queryKey: ['document_item', id],
    queryFn: () => getDocDetail(id),
  });
};

export const useUserTrackInfo = () => {
  return useQuery({
    queryKey: ['user_track_info'],
    queryFn: () => getUserInfo(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMutateTrackInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { field: keyof UserTrackData; data: any }) =>
      updateUserInfo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user_track_info'],
      });
    },
  });
};

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

export const useCiteToDoc = () => {
  const editor = useAIEditor((state) => state.editor_instance);
  const { insertCitation } = useEditorCommand(editor!);
  const appendInTextCitationIds = useCitation(
    (state) => state.appendInTextCitationIds
  );
  const appendInlineCitation = useCitation(
    (state) => state.appendInlineCitation
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
      const inline_id = v4();
      appendInlineCitation({
        inline_id: inline_id,
        data: { ...variables.citation_data },
      });
      insertCitation(inline_id);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  const posthog = usePostHog();
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);
  return useMutation({
    mutationFn: (param: { username: string; password: string }) =>
      userLogin(param),
    onSuccess: async (data) => {
      const toast = (await import('sonner')).toast;
      toast.success('Successfully Login');
      const user_id = JSON.parse(atob(data.access_token.split('.')[1])).subject
        .user_id;
      posthog.identify(user_id);
      setCookie('token', data.access_token, {
        path: '/',
        maxAge: 604800,
        secure: true,
      });
      router.push('/editor');
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
