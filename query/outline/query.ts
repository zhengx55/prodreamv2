import { PAGESIZE } from '@/constant/enum';
import { getUserIdFromToken } from '@/lib/utils';
import { MaterialListRes } from '@/types/brainstorm/types';
import { Prompt } from '@/types/outline/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useGetMaterials = (keyword: string, page: number) => {
  return useQuery<MaterialListRes>({
    queryKey: ['getMaterials', keyword, page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const token = Cookies.get('token');
      const user_id = getUserIdFromToken(token!);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}/${user_id}/material?page=${page}&page_size=${PAGESIZE.MATERIAL_MODAL_PAGE_SIZE}&keyword=${keyword}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data.data;
    },
    staleTime: Infinity,
  });
};

export const useGetPrompts = () => {
  return useQuery<Prompt[]>({
    queryKey: ['getPrompts'],
    queryFn: async () => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}/prompt?page=0&page_size=10`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data.data;
    },
    staleTime: Infinity,
  });
};
