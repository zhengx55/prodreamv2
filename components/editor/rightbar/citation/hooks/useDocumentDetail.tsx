import { getDocDetail } from '@/query/api';
import { useQuery } from '@tanstack/react-query';

export const useDocumentDetail = (id: string) => {
  return useQuery({
    queryKey: ['document_item', id],
    queryFn: () => getDocDetail(id),
  });
};
