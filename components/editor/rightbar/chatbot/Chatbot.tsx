import { chat } from '@/query/api';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
import { v4 } from 'uuid';
import ChatInput from './ChatInput';
import ChatSection from './ChatSection';
import ChatTitle from './ChatTitle';
import Starter from './Starter';
const ChatHistory = dynamic(() => import('./history/ChatHistory'));
const UploadModal = dynamic(() => import('./UploadModal'));

type Props = { t: EditorDictType };
const Chatbot = ({ t }: Props) => {
  console.log('chatbot');
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string>('');
  const chatType = useChatbot((state) => state.chatType);
  const updateCurrentSession = useChatbot(
    (state) => state.updateCurrentSession
  );
  const showHistory = useChatbot((state) => state.showHistory);
  const [messages, setMessages] = useState<
    {
      type: 'mine' | 'system';
      id: string;
      text: string;
    }[]
  >([]);

  const updateChatMessage = useCallback((value: string) => {
    setValue(value);
  }, []);

  // const { mutateAsync: aiResearchChat, isPending: pdfChatSending } =
  //   useMutation({
  //     mutationFn: (params: {
  //       session_id: string;
  //       query?: string;
  //       document_id: string;
  //     }) => researchChat(params),
  //     onSuccess: () => {},
  //     onError: async (error) => {
  //       const { toast } = await import('sonner');
  //       toast.error('Failed to submit your, please try again later.');
  //     },
  //   });

  const { mutateAsync: submitChat, isPending: sending } = useMutation({
    mutationFn: (params: { session_id: string | null; query: string }) =>
      chat(params),

    onSuccess: async (data: ReadableStream) => {
      setMessages((prev) => [...prev, { type: 'mine', text: value, id: v4() }]);
      setValue('');
      const reader = data.pipeThrough(new TextDecoderStream()).getReader();
      const new_id = v4();
      setMessages((prev) => [
        ...prev,
        { type: 'system', text: '', id: new_id },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        handleStreamData(value, new_id);
      }
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error('Failed to send message, please try again later.');
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
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const messageIndex = newMessages.findIndex(
          (message) => message.id === id
        );
        if (messageIndex !== -1) {
          const updatedMessage = {
            ...newMessages[messageIndex],
            text: newMessages[messageIndex].text + eventData.join(''),
          };
          newMessages[messageIndex] = updatedMessage;
        }
        return newMessages;
      });
    }
  };

  return (
    <div
      ref={setContainer}
      className='flex w-full flex-1 flex-col overflow-hidden'
    >
      <AnimatePresence>{showHistory && <ChatHistory t={t} />}</AnimatePresence>
      <UploadModal container={container} />
      <ChatTitle t={t} />
      {!chatType ? (
        <Starter t={t} />
      ) : (
        <ChatSection messages={messages} t={t} />
      )}
      <ChatInput
        value={value}
        updateValue={updateChatMessage}
        t={t}
        mutateFn={submitChat}
        sending={sending}
      />
    </div>
  );
};

export default memo(Chatbot);
