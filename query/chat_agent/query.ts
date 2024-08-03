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
      const body = res.body;
      if (!res.ok) {
        throw new Error('An error occurred while sending the message');
      }
      if (body === null) {
        throw new Error('An error occurred while sending the message');
      }
      return body;
    },
    onSuccess: async (body: ReadableStream<Uint8Array>) => {
      const reader = body?.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        handleStreamData(value);
      }
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};

const handleStreamData = (value: string | undefined) => {
  // console.log(value);
  if (!value) return;
  let session: string | undefined;
  const lines = value.split('\n');
  const datas = lines.reduce((acc, line, index) => {
    if (lines[index - 1]?.startsWith('event: session_id')) {
      session = line.replace('data: ', '').replace('"', '').trim();
    } else if (lines[index - 1]?.startsWith('event: data')) {
      console.log(JSON.parse(line.slice(5)));
      // acc.push(JSON.parse(line.slice(5)));
    }
    return acc;
  }, [] as any[]);
  console.log(datas);
};
