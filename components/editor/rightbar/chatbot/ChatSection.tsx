import { EditorDictType } from '@/types';
import { MineMessage, SystemMessage } from './Message';

type Props = {
  t: EditorDictType;
  engine: number;
  messages: { type: 'mine' | 'system'; text: string; id: string }[];
};
const ChatSection = ({ t, messages, engine }: Props) => {
  return (
    <div className='flex w-full flex-col gap-y-4 overflow-y-auto'>
      {messages.map((message, index) => {
        const isMine = message.type === 'mine';
        return (
          <div key={message.id} className={'flex flex-col gap-y-1'}>
            {isMine ? (
              <MineMessage engine={engine} text={message.text} />
            ) : (
              <SystemMessage engine={engine} text={message.text} />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default ChatSection;
