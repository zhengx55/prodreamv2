import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { ActionButtonType, ICONS } from '@/constant/chat_agent_constant';
import { CHATAGENT_TYPE } from '@/constant/enum';
import { useAgentChat } from '@/query/chat_agent';
import { useAgent } from '@/zustand/store';
import { memo } from 'react';
import useAgentType from '../../hooks/getChatAgentType';
import ChatInputField from './ChatInputField';

const ChatFooter = () => {
  const { storeType } = useAgentType();
  const clearChatSession = useAgent((state) => state.clearSession);
  const { mutate, isPending } = useAgentChat(storeType);
  const actionMap: { [key: string]: CHATAGENT_TYPE } = {
    'Guided Input': CHATAGENT_TYPE.BSBASE,
    'In-depth Exploration': CHATAGENT_TYPE.BSADVANCE,
    'Generate Outline': CHATAGENT_TYPE.OLGEN,
    'Polish Outline': CHATAGENT_TYPE.PLPOL,
    'Generate Draft': CHATAGENT_TYPE.DR,
    'Proofread Draft': CHATAGENT_TYPE.PF,
  };

  const handleActionClick = (text: string) => {
    const agentType = actionMap[text];
    if (agentType) {
      mutate({
        response: null,
        agent: agentType,
        session_id: null,
      });
    }
  };

  const renderActionButtons = () => {
    return (ICONS[storeType] as ActionButtonType[])?.map(
      ({ alt, src, text }) => (
        <ActionButton
          disabled={isPending}
          key={alt}
          onClick={() => handleActionClick(text)}
          alt={alt}
          src={src}
          text={text}
        />
      )
    );
  };

  return (
    <div className='space-y-2 px-4 py-4'>
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
  disabled?: boolean;
};

const ActionButton = ({
  alt,
  src,
  text,
  onClick = () => {},
  disabled = false,
}: ActionButtonProps) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    role='button'
    className='px-2 text-sm'
    variant='outline'
  >
    <Icon
      alt={alt}
      src={src}
      width={20}
      height={20}
      priority
      className='size-5'
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
