import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { ActionButtonType, ICONS } from '@/constant/chat_agent_constant';
import { useAgent } from '@/zustand/store';
import { memo } from 'react';
import useAgentType from '../hooks/getChatAgentType';
import ChatInputField from './ChatInputField';

const ChatFooter = () => {
  const { storeType } = useAgentType();
  const clearChatSession = useAgent((state) => state.clearSession);

  const renderActionButtons = () => {
    return (ICONS[storeType] as ActionButtonType[])?.map(
      ({ alt, src, text }) => (
        <ActionButton key={alt} alt={alt} src={src} text={text} />
      )
    );
  };

  return (
    <div className='space-y-2 px-4 pb-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-1'>{renderActionButtons()}</div>
        <div className='flex gap-x-2'>
          {ICONS.common.map(({ alt, src }) => (
            <IconButton
              key={alt}
              alt={alt}
              src={src}
              onClick={
                alt === 'new' ? () => clearChatSession(storeType) : undefined
              }
            />
          ))}
        </div>
      </div>
      <ChatInputField />
    </div>
  );
};

type ActionButtonProps = {
  alt: string;
  src: string;
  text: string;
  onClick?: () => void;
};

const ActionButton = ({
  alt,
  src,
  text,
  onClick = () => {},
}: ActionButtonProps) => (
  <Button
    onClick={onClick}
    role='button'
    className='px-1 text-xs'
    variant='outline'
  >
    <Icon
      alt={alt}
      src={src}
      width={20}
      height={20}
      priority
      className='size-4'
    />
    {text}
  </Button>
);

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

export default memo(ChatFooter);
