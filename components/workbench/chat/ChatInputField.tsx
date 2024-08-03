import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAgentChat } from '@/query/chat_agent/query';
import { memo, useState } from 'react';

const ChatInputField = () => {
  const [inputMessage, setInputMessage] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };
  const { mutateAsync: send, isPending: isMessageSending } = useAgentChat();

  const handleSend = async () => {
    setInputMessage('');
    await send({
      response: inputMessage,
      agent: 'Brainstorm',
      session_id: null,
    });
  };

  const handleKeyboardSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      handleSend();
    }
  };

  return (
    <div className='relative mt-auto flex h-16 w-full items-center gap-x-2 rounded-lg border border-gray-300 bg-white p-2.5'>
      <Input
        type='text'
        onKeyUp={handleKeyboardSend}
        value={inputMessage}
        onChange={handleInputChange}
        placeholder='Type a message...'
        className='base-regular border-none p-0 focus-visible:ring-0'
        name='chat-input'
      />
      <Button
        onClick={handleSend}
        disabled={!inputMessage}
        size={'send'}
        role='button'
      >
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
