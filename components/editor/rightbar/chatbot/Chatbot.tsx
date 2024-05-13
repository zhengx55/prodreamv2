import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import ChatInput from './chat/ChatInput';
import ChatTitle from './chat/ChatTitle';
import Starter from './chat/Starter';
import DeleteModal from './chat/history/DeleteModal';
const ChatSection = dynamic(() => import('./chat/ChatSection'));
const ChatHistory = dynamic(() => import('./chat/history/ChatHistory'));
const UploadModal = dynamic(() => import('./chat/UploadModal'));

type Props = { t: EditorDictType };
const Chatbot = ({ t }: Props) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const currentSession = useChatbot((state) => state.currentSession);
  const showHistory = useChatbot((state) => state.showHistory);

  return (
    <div
      ref={setContainer}
      className='flex w-full flex-1 flex-col overflow-hidden'
    >
      <AnimatePresence>{showHistory && <ChatHistory t={t} />}</AnimatePresence>
      <UploadModal t={t} container={container} />
      <DeleteModal t={t} container={container} />
      <ChatTitle t={t} />
      {!currentSession ? <Starter t={t} /> : <ChatSection t={t} />}
      <ChatInput t={t} />
    </div>
  );
};

export default memo(Chatbot);
