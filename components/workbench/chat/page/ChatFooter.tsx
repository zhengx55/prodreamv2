import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { ICONS } from '@/constant/chat_agent_constant';
import { CHATAGENT_TYPE } from '@/constant/enum';
import { useAgentChat } from '@/query/chat_agent';
import { useAgent } from '@/zustand/store';
import { Layers } from 'lucide-react';
import { memo } from 'react';
import ChatInputField from './ChatInputField';

type IconButtonProps = {
  alt: string;
  src: string;
  onClick?: () => void;
};

const IconButton = ({ alt, src, onClick = () => {} }: IconButtonProps) => (
  <Button
    onClick={onClick}
    variant='icon'
    className='size-max p-1'
    role='button'
  >
    <Icon
      alt={alt}
      src={src}
      width={20}
      height={20}
      priority
      className='size-5'
    />
  </Button>
);

const ChatFooter = () => {
  const clearChatSession = useAgent((state) => state.clearSession);
  const { mutate: chat, isPending } = useAgentChat('chat');
  return (
    <footer className='w-[860px] space-y-2.5 self-center pt-4'>
      <div className='flex-between'>
        <Button
          disabled={isPending}
          role='button'
          className='px-2 text-sm'
          variant='outline'
          onClick={() =>
            chat({
              response: null,
              agent: CHATAGENT_TYPE.INITIAL,
              session_id: null,
            })
          }
        >
          <Layers size={20} className='text-indigo-500' />
          Common guidance
        </Button>
        <div className='flex gap-x-2'>
          {ICONS.common.map(({ alt, src }) => (
            <IconButton
              key={alt}
              alt={alt}
              src={src}
              onClick={
                alt === 'new' ? () => clearChatSession('chat') : undefined
              }
            />
          ))}
        </div>
      </div>
      <ChatInputField />
    </footer>
  );
};

export default memo(ChatFooter);
