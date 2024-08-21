import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { LoginData } from '../type';

export const useUserSession = () => {
  return useQuery<LoginData>({
    queryKey: ['user-session'],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(data.msg as string);
      }
      return data.data;
    },
    staleTime: Infinity,
  });
};

export const useUserTrack = () => {
  return useQuery<{
    isFirstChat: boolean;
  } | null>({
    queryKey: ['user-track'],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/auxiliary_info`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(data.msg as string);
      }
      return data.data;
    },
    staleTime: Infinity,
  });
};

export const useMutationUserTrack = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (field: string) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/auxiliary_info`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            field,
            data: 'true',
          }),
        }
      );
      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(data.msg as string);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['user-track'] });
    },
  });
};

export const useGetSessionHistoryList = () => {
  return useQuery<{
    session_id: string;
    title: string;
    class: 'chat' | 'bs' | 'outline' | 'draft';
  }>({
    staleTime: Infinity,
    queryKey: ['session-history'],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}agent/sessions`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(data.msg as string);
      }
      return data.data;
    },
  });
};
