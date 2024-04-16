import { chat } from '@/query/api';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { XCircle } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { v4 } from 'uuid';
import ChatInput from './chatbot/ChatInput';
import ChatSection from './chatbot/ChatSection';

type Props = { t: EditorDictType };
const Chatbot = ({ t }: Props) => {
  const [chatEngine, setChatEngine] = useState<number>(1);
  const [value, setValue] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [session, setSession] = useState<string | null>(null);
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
  const updateChatEngine = useCallback((value: number) => {
    setChatEngine(value);
  }, []);

  const { mutateAsync: submitChat } = useMutation({
    mutationFn: (params: { session_id: string | null; query: string }) =>
      chat(params),
    onMutate: () => {
      setSending(true);
    },
    onSuccess: async (data: ReadableStream) => {
      setSending(false);
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
      setSending(false);
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
      setSession(session);
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
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      <ChatTitle t={t} />
      <ChatSection engine={chatEngine} messages={messages} t={t} />
      <ChatInput
        value={value}
        updateValue={updateChatMessage}
        t={t}
        session={session}
        engine={chatEngine}
        updateEngine={updateChatEngine}
        mutateFn={submitChat}
        sending={sending}
      />
    </div>
  );
};
export default memo(Chatbot);

const ChatTitle = ({ t }: { t: EditorDictType }) => {
  const toggleRightbar = useAIEditor((state) => state.toggleRightbar);

  return (
    <div className='flex-between mb-4'>
      <div className='flex items-center gap-x-4'>
        <h2 className='title-medium'>Dream Cat AI</h2>
      </div>
      <XCircle
        size={20}
        onClick={toggleRightbar}
        className='shrink-0 cursor-pointer text-shadow hover:opacity-50'
      />
    </div>
  );
};
