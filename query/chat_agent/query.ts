import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useAgentChat = () => {
  return useMutation({
    mutationFn: async (params: {
      session_id: string | null;
      agent: 'Brainstorm' | 'Outline' | 'Draft';
      response: string;
    }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/chat/agent`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );
      const data = await res.json();
      if (data.code !== 0) {
        throw new Error(data.msg as string);
      }
    },
    onSuccess: () => {},
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};
