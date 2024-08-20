'use client';

import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CHATAGENT_TYPE } from '@/constant/enum';
import { useAgentChat } from '@/query/chat_agent';
import { useAgent } from '@/zustand/store';
import { memo, useState } from 'react';

const ChatInputField = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { mutateAsync: chat, isPending } = useAgentChat('chat');
  const getSessionId = useAgent((state) => state.getSessionId);

  const handleSend = async () => {
    setInputMessage('');
    await chat({
      response: inputMessage,
      agent: CHATAGENT_TYPE.REGULAR,
      session_id: getSessionId('chat'),
    });
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
    <div className='flex h-[60px] w-full items-center gap-x-2 rounded-lg border border-gray-300 bg-slate-50 px-2.5'>
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
