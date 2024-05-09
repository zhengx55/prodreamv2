import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { memo, useEffect, useRef } from 'react';
import { MineMessage, SystemMessage } from './Message';

type Props = {
  t: EditorDictType;
};
const ChatSection = ({ t }: Props) => {
  const messageList = useChatbot((state) => state.messageList);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);
  return (
    <div className='flex w-full flex-col gap-y-4 overflow-y-auto'>
      {messageList.map((message, index) => {
        const isMine = message.type === 'mine';
        return (
          <div key={message.id} className={'flex flex-col gap-y-1'}>
            {isMine ? (
              <MineMessage text={message.text} filename={message.filename} />
            ) : (
              <SystemMessage text={message.text} />
            )}
          </div>
        );
      })}
      <div ref={endOfMessagesRef} />
    </div>
  );
};
export default memo(ChatSection);
