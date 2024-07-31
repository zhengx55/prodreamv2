import { PAGESIZE } from '@/constant/enum';
import { getUserIdFromToken } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useGetMaterials = (keyword: string, page: number) => {
  return useQuery({
    queryKey: ['getMaterials', keyword, page],
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
