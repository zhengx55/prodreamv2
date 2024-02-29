import { useEditorCommand } from '@/components/editor/hooks/useEditorCommand';
import { DocSortingMethods, ICitationType } from '@/types';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useCookies } from 'react-cookie';
import {
  createCitation,
  getDocDetail,
  getDocs,
  getUserInfo,
  getUserMemberShip,
  purchaseMembership,
  resendEmail,
  unSubscripeMembership,
  updateCitation,
  updateUserInfo,
  userLogin,
} from './api';
import { UserTrackData } from './type';
import {
  postABTest,
  postABTestByToken,
  postABTestPagePoint,
  postABTestPagePointByToken,
} from './test';

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

export const useUnsubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { subscription_id: string }) =>
      unSubscripeMembership(params),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      const toast = (await import('sonner')).toast;
      toast.success('Successfully Unsubscribed');
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

export const useUpdateCitation = () => {
  const updateCitationItem = useCitation((state) => state.updateCitationItem);
  return useMutation({
    mutationFn: (params: {
      citation_type: ICitationType;
      id: string;
      data: any;
    }) => updateCitation(params),
    onSuccess: async (_data, variables) => {
      const toast = (await import('sonner')).toast;
      toast.success('Citation Updated successfully');
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
      const toast = (await import('sonner')).toast;
      toast.success('Citation created successfully');
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

export const useRensendEmail = () => {
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

export const usePostABTest = () => {
  return useMutation({
    mutationFn: (variance?: string) => postABTest(variance ?? ''),
    onSuccess: async (value) => {
      console.log('ABTest:', value);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      console.error('ABTest error:', error);
    },
  });
};

export const usePostABTestByToken = () => {
  return useMutation({
    mutationFn: (variance?: string) => postABTestByToken(variance ?? ''),
    onSuccess: async (value) => {
      console.log('ABTest:', value);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      console.error('ABTest error:', error);
    },
  });
};

export const usePostABTestPagePoint = () => {
  return useMutation({
    mutationFn: (params: { page: string; duration?: number }) =>
      postABTestPagePoint(params),
    onSuccess: async (value) => {
      console.log('ABTest:', value);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      console.error('ABTest error:', error);
    },
  });
};

export const usePostABTestPagePointByToken = () => {
  return useMutation({
    mutationFn: (params: { page: string; duration?: number }) =>
      postABTestPagePointByToken(params),
    onSuccess: async (value) => {
      console.log('ABTest:', value);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      console.error('ABTest error:', error);
    },
  });
};
