import { chat } from '@/query/api';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { XCircle } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import ChatInput from './chatbot/ChatInput';
import ChatSection from './chatbot/ChatSection';

type Props = { t: EditorDictType };
const Chatbot = ({ t }: Props) => {
  const [chatEngine, setChatEngine] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [session, setSession] = useState<string | null>(null);
  const updateChatMessage = useCallback((value: string) => {
    setValue(value);
  }, []);
  const updateChatEngine = useCallback((value: number) => {
    setChatEngine(value);
  }, []);
  const { mutateAsync: submitChat } = useMutation({
    mutationFn: (params: { session_id?: string; query: string }) =>
      chat(params),
    onMutate: () => {
      setSending(true);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: () => {
      setSending(false);
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error('Failed to send message, please try again later.');
    },
  });

  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      <ChatTitle t={t} />
      <ChatSection t={t} />
      <ChatInput
        value={value}
        updateValue={updateChatMessage}
        t={t}
        engine={chatEngine}
        updateEngine={updateChatEngine}
        mutateFn={submitChat}
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
