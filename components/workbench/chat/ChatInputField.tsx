import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { memo, useState } from 'react';

type Props = {};

const ChatInputField = (props: Props) => {
  const [inputMessage, setInputMessage] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };
  return (
    <div className='relative mt-auto flex h-16 w-full items-center rounded-lg border border-gray-300 bg-white p-2.5'>
      <Input
        type='text'
        value={inputMessage}
        onChange={handleInputChange}
        placeholder='Type a message...'
        className='base-regular border-none p-0 focus-visible:ring-0'
        name='chat-input'
      />
      <Button disabled={!inputMessage} size={'send'} role='button'>
        <Icon
          alt='send'
          src='/chat_agent/common/send.svg'
          width={20}
          height={20}
          priority
          className='size-[18px]'
        />
      </Button>
    </div>
  );
};

export default memo(ChatInputField);
