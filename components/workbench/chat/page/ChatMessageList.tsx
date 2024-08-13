import { useAgent } from '@/zustand/store';
import { memo, useEffect, useRef } from 'react';
import Message from '../common/ChatMessageItem';

const ChatMessageList = () => {
  const messageList = useAgent((state) => state.getMessages('chat'));
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);
  return (
    <div className='flex w-[800px] flex-1 flex-col gap-y-8 self-center overflow-y-auto py-8'>
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
