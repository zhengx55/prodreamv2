'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSend?: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  className,
  onSend,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() && onSend) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className='relative flex w-full items-center'>
      <Input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        className={cn(
          'w-full rounded-lg border border-transparent bg-[#F6F7FB] px-4 py-6 pr-12',
          'placeholder:font-poppins placeholder:text-base placeholder:font-normal placeholder:leading-7 placeholder:text-[#9F9DA3]',
          'font-poppins text-base font-normal leading-7 text-[#57545E]',
          'focus:border-[#7270E8] focus:bg-[#F6F7FB] focus:outline-none',
          className
        )}
        placeholder='Type a message...'
        {...props}
      />
      <button
        onClick={handleSend}
        className={cn(
          'absolute right-2 rounded-lg transition-all duration-200 ease-in-out',
          inputValue.trim() ? 'bg-[#7270E8] text-white' : 'border bg-[#C9CFDC]'
        )}
        disabled={!inputValue.trim()}
      >
        <Image
          src='/workbench/chat_input_enter.svg'
          alt='Send'
          width={32}
          height={32}
          className='h-[32px] w-[32px] p-[4px]'
        />
      </button>
    </div>
  );
};

export default ChatInput;
