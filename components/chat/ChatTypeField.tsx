'use client';
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  memo,
} from 'react';
import { Textarea } from '../ui/textarea';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = { onSendMessage: (value: string) => void };

const ChatTypeLoading = () => {
  return (
    <div className='absolute bottom-6 right-5 flex gap-x-1'>
      <span className='h-2 w-2 animate-bounce rounded-full bg-dot' />
      <span className='h-2 w-2 animate-bounce rounded-full bg-dot delay-100' />
      <span className='h-2 w-2 animate-bounce rounded-full bg-dot delay-200' />
    </div>
  );
};

const ChatTypeField = ({ onSendMessage }: Props) => {
  const [message, setMessage] = useState<string>('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const [InputLoading, setInputLoading] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!ref.current) return;
    const textarea = e.target;
    // textarea 会留有换行符
    if (textarea.value === '\n') {
      textarea.value = '';
    }
    ref.current.style.height = 'auto';
    ref.current.style.height = `${textarea.scrollHeight}px`;
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!ref.current) return;
    if (message.trim() !== '') {
      setInputLoading(true);
      onSendMessage(message.trim());
      setMessage('');
      ref.current.style.height = '62px';
      setInputLoading(false);
    }
  };

  return (
    <motion.div className='t absolute bottom-0 h-auto w-full bg-white'>
      <Textarea
        ref={ref}
        rows={1}
        disabled={InputLoading}
        placeholder='Type your message...'
        className='text-md max-h-[220px] min-h-[62px] w-[99%] resize-none py-4 pr-14 focus-visible:shadow-textarea focus-visible:ring-0'
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      {InputLoading ? (
        <ChatTypeLoading />
      ) : (
        <div
          className='flex-center absolute bottom-4 right-5 h-8 w-8 cursor-pointer rounded-xl bg-primary-200 leading-none transition-transform hover:-translate-y-1'
          onClick={sendMessage}
        >
          <Send className='shrink-0 text-white' size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default memo(ChatTypeField);
