import { chatHistory, deleteHistory } from '@/query/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
