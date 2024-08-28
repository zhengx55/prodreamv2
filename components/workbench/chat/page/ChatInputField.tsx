'use client';

import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CHATAGENT_TYPE } from '@/constant/enum';
import { memo, useState } from 'react';

type Props = {
  isChatPending: boolean;
  onSubmit: (agent: string, response?: string) => void;
  showHistory: boolean;
};

const ChatInputField = ({ isChatPending, onSubmit, showHistory }: Props) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = async () => {
    setInputMessage('');
    onSubmit(CHATAGENT_TYPE.REGULAR, inputMessage);
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
    <div
      className={`${showHistory ? 'rounded-b-lg' : 'rounded-lg'} flex h-[52px] w-full items-center gap-x-2 border border-gray-300 bg-white px-2.5 transition-all duration-300 focus-within:border-indigo-500 focus-within:bg-slate-50`}
    >
      <Input
        disabled={isChatPending}
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
        disabled={!inputMessage || isChatPending}
        size={'send'}
        className='p-1.5'
        role='button'
      >
        <Icon
          alt='send'
          src='/chat_agent/common/send.svg'
          width={30}
          height={30}
          priority
          className='size-5'
        />
      </Button>
    </div>
  );
};

export default memo(ChatInputField);
