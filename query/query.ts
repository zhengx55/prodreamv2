import { useEditorCommand } from '@/components/editor/hooks/useEditorCommand';
import { Locale } from '@/i18n-config';
import { DocSortingMethods, ICitationType } from '@/types';
import { useAIEditor, useCitation } from '@/zustand/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { isMobile } from 'react-device-detect';
import {
  ButtonTrack,
  chatHistory,
  createCitation,
  deleteHistory,
  getDiscountInfo,
  getDocDetail,
  getDocs,
  getReferenceType,
  getUserInfo,
  getUserMemberShip,
  purchaseMembership,
  resendEmail,
  unSubscripeMembership,
  updateCitation,
  updateUserInfo,
  userLogin,
} from './api';
import { ReferenceType, UserTrackData } from './type';

export const useMembershipInfo = () => {
  return useQuery({
    queryKey: ['membership'],
    queryFn: () => getUserMemberShip(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useDiscountInfo = () => {
  return useQuery({
    queryKey: ['discount'],
    queryFn: () => getDiscountInfo(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMutationMembership = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (params: { product_id: string; url: string; coupon: string }) =>
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
    staleTime: 0,
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
          ...data,
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
      const { selection } = editor!.state;
      const { from, to, anchor } = selection;
      await appendInTextCitationIds({
        type: variables.citation_type,
        data,
      });

      insertCitation(data.id, anchor, from, to);
      const toast = (await import('sonner')).toast;
      toast.success('Citation created successfully');
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

export const useUserLogin = (lang: Locale) => {
  const router = useRouter();
  const [_cookies, setCookie] = useCookies(['token']);
  return useMutation({
    mutationFn: (param: { username: string; password: string }) =>
      userLogin(param),
    onSuccess: async (data) => {
      const toast = (await import('sonner')).toast;
      toast.success('Successfully Login');
      setCookie('token', data.access_token, {
        path: '/',
        maxAge: 604800,
        secure: true,
        sameSite: 'lax',
      });
      router.push(`/${lang}/editor`);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};

export const useButtonTrack = () => {
  return useMutation({
    mutationFn: ({ event }: { event: string }) =>
      ButtonTrack(event, isMobile ? 1 : 0),
  });
};

export const useGetReference = ({
  type,
  bibtex,
}: {
  type: ReferenceType;
  bibtex: string[];
}) => {
  return useQuery({
    queryFn: () => getReferenceType({ type, bibtex }),
    queryKey: ['reference', type, bibtex],
    enabled: bibtex.length > 0,
    staleTime: Infinity,
  });
};

// ------------------ Chatbot ------------------
export const useChatBotSessions = ({
  document_id,
  query,
  history_type,
}: {
  query?: string;
  document_id: string;
  history_type: 'chat' | 'research';
}) => {
  return useQuery({
    queryKey: ['session-history', document_id, history_type, query],
    queryFn: () =>
      chatHistory({ document_id, history_type, page: 0, page_size: 20, query }),
    staleTime: Infinity,
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (session_id: string) => deleteHistory(session_id),
    onSuccess: async () => {
      const toast = (await import('sonner')).toast;
      toast.success('Session deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['session-history'] });
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
