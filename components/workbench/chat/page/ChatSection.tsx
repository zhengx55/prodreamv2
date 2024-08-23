'use client';

import { CHATAGENT_TYPE } from '@/constant/enum';
import { useAgentChat } from '@/query/chat_agent';
import { useUserTrack } from '@/query/session';
import { useAgent } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import ChatCover from './ChatCover';
import ChatFooter from './ChatFooter';
import ChatMessageList from './ChatMessageList';

const ChatSection = () => {
  const sessionId = useAgent((state) => state.sessionId);
  const { data, status } = useUserTrack();
  const { mutate: chat, isPending: isChatPending } = useAgentChat('chat');
  const handleChat = useCallback(
    (agent: string, response?: string) => {
      chat({
        response: response ?? null,
        agent: agent as any,
        session_id: agent === CHATAGENT_TYPE.INITIAL ? null : sessionId,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionId]
  );

  useEffect(() => {
    if (status === 'success' && !Boolean(data?.isFirstChat)) {
      chat({ response: null, agent: CHATAGENT_TYPE.INITIAL, session_id: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (status === 'pending')
    return (
      <div className='flex-center flex-1'>
        <Loader2 size={32} className='animate-spin text-indigo-500' />
      </div>
    );
  return (
    <>
      {!sessionId ? <ChatCover /> : <ChatMessageList />}
      <ChatFooter isChatPending={isChatPending} onSubmit={handleChat} />
    </>
  );
};

export default ChatSection;
