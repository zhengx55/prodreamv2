import { researchChat } from '@/query/api';
import { useChatbot } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

export default function useResearchChat() {
  const appendMessage = useChatbot((state) => state.appendMessage);
  const updateMessageItem = useChatbot((state) => state.updateMessageItem);
  const updateCurrentSession = useChatbot(
    (state) => state.updateCurrentSession
  );
  const [value, setValue] = useState<string>('');

  const { mutateAsync: aiResearchChat, isPending: aiChatSending } = useMutation(
    {
      mutationFn: (params: {
        session_id: string | null;
        query: string;
        document_id: string;
      }) => researchChat(params),
      onSuccess: async (data: ReadableStream) => {
        const new_mine_id = v4();
        appendMessage({ type: 'mine', text: value, id: new_mine_id });
        setValue('');
        const reader = data.pipeThrough(new TextDecoderStream()).getReader();
        const new_id = v4();
        appendMessage({ type: 'system', text: '', id: new_id });
        while (true) {
          const { value, done } = await reader.read();
          console.log('🚀 ~ onSuccess: ~ value:', value);
          if (done) {
            break;
          }
          handleStreamData(value, new_id);
        }
      },
      onError: async (error) => {
        const { toast } = await import('sonner');
        toast.error('Failed to submit your, please try again later.');
      },
    }
  );

  const handleStreamData = (value: string | undefined, id: string) => {
    if (!value) return;

    const lines = value.split('\n');
    let session: string | undefined;

    const eventData = lines.reduce((acc, line, index) => {
      if (lines[index - 1]?.startsWith('event: session_id')) {
        session = line.replace('data: "', '').replace('"', '').trim();
      }
      if (
        line.startsWith('data:') &&
        lines[index - 1]?.startsWith('event: data')
      ) {
        acc.push(JSON.parse(line.slice('data:'.length)));
      }
      return acc;
    }, [] as any[]);
    if (session) {
      updateCurrentSession(session);
    }
    if (eventData.length > 0) {
      updateMessageItem(id, eventData);
    }
  };
  const updateChatMessage = useCallback((value: string) => {
    setValue(value);
  }, []);
  return {
    aiChatSending,
    aiResearchChat,
    value,
    updateChatMessage,
  };
}
