import { useAgent } from '@/zustand/store';
import { memo, useEffect, useRef } from 'react';
import useAgentType from '../hooks/getChatAgentType';
import Message from './ChatMessageItem';

const ChatMessageList = () => {
  const { storeType } = useAgentType();
  const messageList = useAgent((state) => state.getMessages(storeType));
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  return (
    <div className='flex flex-1 flex-col gap-y-8 overflow-y-auto px-4 pb-4 pt-6'>
      {messageList.map((message) => {
        if (message.role === 'user') {
          return <Message.User key={message.id} text={message.text} />;
        }
        return <Message.Agent key={message.id} message={message} />;
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default memo(ChatMessageList);
