import { EditorDictType } from '@/types';
import { MineMessage, SystemMessage } from './Message';

type Props = {
  t: EditorDictType;
  messages: { type: 'mine' | 'system'; text: string; id: string }[];
};
const ChatSection = ({ t, messages }: Props) => {
  return (
    <div className='flex w-full flex-col gap-y-4 overflow-y-auto'>
      {messages.map((message, index) => {
        const isMine = message.type === 'mine';
        return (
          <div key={message.id} className={'flex flex-col gap-y-1'}>
            {isMine ? (
              <MineMessage text={message.text} />
            ) : (
              <SystemMessage text={message.text} />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default ChatSection;
