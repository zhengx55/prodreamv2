import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { XCircle } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import ChatInput from './chatbot/ChatInput';
import ChatSection from './chatbot/ChatSection';

type Props = { t: EditorDictType };
const Chatbot = ({ t }: Props) => {
  const [chatEngine, setChatEngine] = useState<number>(0);
  const updateChatEngine = useCallback((value: number) => {
    setChatEngine(value);
  }, []);
  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      <ChatTitle t={t} />
      <ChatSection t={t} />
      <ChatInput t={t} engine={chatEngine} update={updateChatEngine} />
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
