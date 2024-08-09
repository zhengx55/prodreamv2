'use client';

import { useAgent } from '@/zustand/store';
import ChatCover from './ChatCover';
import ChatMessageList from './ChatMessageList';

const ChatSection = () => {
  const sessionId = useAgent((state) => state.sessionId);
  return !sessionId ? <ChatCover /> : <ChatMessageList />;
};

export default ChatSection;
