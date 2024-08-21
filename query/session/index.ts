import { useQuery } from '@tanstack/react-query';
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
  return useQuery({
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
