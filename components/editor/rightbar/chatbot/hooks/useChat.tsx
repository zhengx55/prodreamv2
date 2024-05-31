import { chat, pdfSummary } from '@/query/api';
import { useChatbot } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { v4 } from 'uuid';

export default function useChat() {
  const queryClient = useQueryClient();
  const appendMessage = useChatbot((state) => state.appendMessage);
  const currentFile = useChatbot((state) => state.currentFile);
  const updateMessageItem = useChatbot((state) => state.updateMessageItem);
  const updateCurrentFile = useChatbot((state) => state.updateCurrentFile);
  const updateCurrentSession = useChatbot(
    (state) => state.updateCurrentSession
  );
  const [value, setValue] = useState<string>('');
  const trans = useTranslations('Editor');

  const { mutateAsync: summary, isPending: isSummarzing } = useMutation({
    mutationFn: (params: {
      session_id: string | null;
      document_id: string;
      attachment: {
        id: string;
        size: number;
        filename: string;
      };
    }) => pdfSummary(params),
    onSuccess: async (data: ReadableStream, variables) => {
      const new_mine_id = v4();
      appendMessage({
        type: 'mine',
        text: trans('Hooks.useChat.Summarize_this_file'),
        id: new_mine_id,
        filename: variables.attachment.filename,
      });
      updateCurrentFile(null);
      const message_id = v4();
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      appendMessage({
        type: 'system',
        text: '',
        id: message_id,
      });

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          queryClient.invalidateQueries({ queryKey: ['session-history'] });
          break;
        }
        handleStreamData(value, message_id);
      }
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      const errorMessage = trans('Hooks.useChat.Failed_to_summarize_pdf');
      toast.error(errorMessage);
    },
  });

  const { mutateAsync: submitChat, isPending: sending } = useMutation({
    mutationFn: (params: {
      session_id: string | null;
      query: string;
      document_id: string;
      attachment: {
        id: string;
        size: number;
        filename: string;
      } | null;
    }) => chat(params),

    onSuccess: async (data: ReadableStream, variables) => {
      const new_mine_id = v4();
      appendMessage({
        type: 'mine',
        text: value,
        id: new_mine_id,
        filename: variables.attachment?.filename,
      });

      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      const new_id = v4();
      appendMessage({ type: 'system', text: '', id: new_id });
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          queryClient.invalidateQueries({ queryKey: ['session-history'] });
          updateCurrentFile(null);
          setValue('');
          break;
        }
        handleStreamData(value, new_id);
      }
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      const errorMessage = trans('Hooks.useChat.Failed_to_send_message');
      toast.error(errorMessage);
    },
  });

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
    submitChat,
    summary,
    isSummarzing,
    sending,
    value,
    updateChatMessage,
  };
}
