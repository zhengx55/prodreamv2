import { researchChat } from '@/query/api';
import { useChatbot } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

export default function useResearchChat() {
  const queryClient = useQueryClient();
  const appendResearchItem = useChatbot((state) => state.appendResearchItem);
  const updateResearchMessage = useChatbot(
    (state) => state.updateResearchMessage
  );
  const updateResearchReference = useChatbot(
    (state) => state.updateResearchReference
  );
  const updateCurrentResearchSession = useChatbot(
    (state) => state.updateCurrentResearchSession
  );
  const [value, setValue] = useState<string>('');

  const { mutateAsync: aiResearchChat, isPending: aiChatSending } = useMutation(
    {
      mutationFn: (params: {
        session_id: string | null;
        query: string;
        document_id: string;
      }) => researchChat(params),
      onSuccess: async (data: ReadableStream, variables) => {
        const new_id = v4();
        setValue('');
        appendResearchItem({
          query: variables.query,
          id: new_id,
          message: '',
          reference: [],
        });
        const reader = data.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            queryClient.invalidateQueries({ queryKey: ['session-history'] });
            break;
          }
          handleStreamData(value, new_id);
        }
      },
      onError: async (error) => {
        const { toast } = await import('sonner');
        toast.error(error.message);
      },
    }
  );

  const handleStreamData = (value: string | undefined, id: string) => {
    if (!value) return;

    const lines = value.split('\n');
    let session: string | undefined;
    let reference: any;

    const eventData = lines.reduce((acc, line, index) => {
      if (lines[index - 1]?.startsWith('event: session_id')) {
        session = line.replace('data: "', '').replace('"', '').trim();
      }
      if (lines[index - 1]?.startsWith('event: reference')) {
        reference = JSON.parse(line.slice(5));
        updateResearchReference(id, reference);
      }
      if (
        line.startsWith('data:') &&
        lines[index - 1]?.startsWith('event: data')
      ) {
        acc.push(JSON.parse(line.slice(5)));
      }
      return acc;
    }, [] as any[]);
    if (session) {
      updateCurrentResearchSession(session);
    }
    if (eventData.length > 0) {
      updateResearchMessage(id, eventData);
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
