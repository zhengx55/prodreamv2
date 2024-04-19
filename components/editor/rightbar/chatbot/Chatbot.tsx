import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import ChatInput from './ChatInput';
import ChatSection from './ChatSection';
import ChatTitle from './ChatTitle';
import Starter from './Starter';
import DeleteModal from './history/DeleteModal';
const ChatHistory = dynamic(() => import('./history/ChatHistory'));
const UploadModal = dynamic(() => import('./UploadModal'));

type Props = { t: EditorDictType };
const Chatbot = ({ t }: Props) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const chatType = useChatbot((state) => state.chatType);
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
      {!chatType ? <Starter t={t} /> : <ChatSection t={t} />}
      <ChatInput t={t} />
    </div>
  );
};

export default memo(Chatbot);
