'use client';

import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { memo, useState } from 'react';

const ChatInputField = () => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = async () => {
    setInputMessage('');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };
  const handleKeyboardSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      handleSend();
    }
  };
  return (
    <div className='flex h-[52px] w-full items-center gap-x-2 rounded-lg border border-gray-300 bg-slate-50 px-2.5'>
      <Input
        onKeyUp={handleKeyboardSend}
        value={inputMessage}
        onChange={handleInputChange}
        type='text'
        placeholder='Type a message...'
        className='base-regular border-none bg-transparent p-0 focus-visible:ring-0'
        name='chat-input'
      />
      <Button
        onClick={handleSend}
        disabled={!inputMessage}
        size={'send'}
        className='p-1'
        role='button'
      >
        <Icon
          alt='send'
          src='/chat/send.svg'
          width={24}
          height={24}
          priority
          className='size-6'
        />
      </Button>
    </div>
  );
};

export default memo(ChatInputField);
