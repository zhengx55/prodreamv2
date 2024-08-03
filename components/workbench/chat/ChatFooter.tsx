import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { memo } from 'react';
import ChatInputField from './ChatInputField';

type Props = {};

const ChatFooter = (props: Props) => {
  return (
    <div className='space-y-2 px-4 pb-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-1'>
          <ActionButton
            alt='history'
            src='/chat_agent/brainstorming/guide.svg'
            text='Guided Input'
          />
          <ActionButton
            alt='explore'
            src='/chat_agent/brainstorming/explore.svg'
            text='In-depth Exploration'
          />
        </div>
        <div className='flex gap-x-2'>
          <IconButton alt='history' src='/chat_agent/common/history.svg' />
          <IconButton alt='new' src='/chat_agent/common/new.svg' />
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
};

const ActionButton = ({ alt, src, text }: ActionButtonProps) => (
  <Button role='button' className='px-1 text-xs' variant={'outline'}>
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
};

const IconButton = ({ alt, src }: IconButtonProps) => (
  <Button variant={'icon'} className='size-max p-1' role='button'>
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
