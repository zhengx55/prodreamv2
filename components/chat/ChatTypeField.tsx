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
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AnswerRequestParam } from '@/types';
import { usePathname } from 'next/navigation';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import WorkInfo from '../resume/forms/workInfo';
import Image from 'next/image';

type Props = {
  isSending: boolean;
  questionId: string;
  onSendMessage: UseMutateAsyncFunction<
    any,
    Error,
    AnswerRequestParam,
    unknown
  >;
};

const ChatTypeLoading = () => {
  return (
    <div className='absolute bottom-6 right-5 flex gap-x-1'>
      <span className='h-2 w-2 animate-bounce rounded-full bg-dot' />
      <span className='h-2 w-2 animate-bounce rounded-full bg-dot delay-100' />
      <span className='h-2 w-2 animate-bounce rounded-full bg-dot delay-200' />
    </div>
  );
};

const ChatTypeField = ({ isSending, questionId, onSendMessage }: Props) => {
  const [message, setMessage] = useState<string>('');
  const { formAnswers } = useChatNavigatorContext();
  const ref = useRef<HTMLTextAreaElement>(null);
  const path = usePathname();
  const template_id = path.split('/')[3];

  // const [InputLoading, setInputLoading] = useState(false);
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

  const sendMessage = async () => {
    if (!ref.current) return;
    if (message.trim() !== '') {
      await onSendMessage({
        questionid: questionId,
        sessionid: '',
        templateid: template_id,
        message,
        formQuestionAnswer: formAnswers,
        previousSessionids: [],
      });
      setMessage('');
      ref.current.style.height = '62px';
    }
  };

  return (
    <motion.div className='absolute bottom-4 left-4 h-auto w-[calc(100%_-_2rem)] bg-white'>
      <div className='flex-center absolute bottom-4 left-2 h-6 w-6 rounded-full bg-primary-200 '>
        <Image
          src='/robotoutline.png'
          alt='robot'
          width={20}
          height={20}
          priority
        />
      </div>

      <Textarea
        ref={ref}
        rows={1}
        disabled={isSending}
        placeholder='Type to chat with Max!'
        className='max-h-[220px] min-h-[58px] w-[99%] resize-none py-4 pl-8 pr-14 text-[16px] focus-visible:shadow-textarea focus-visible:ring-0'
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      {isSending ? (
        <ChatTypeLoading />
      ) : (
        <Image
          alt='chatsent'
          className='absolute bottom-4 right-5 cursor-pointer transition-transform hover:-translate-y-1'
          src='/telegram_fill.svg'
          width={23}
          height={24}
        />
        //       <div
        //   className='flex-center absolute bottom-4 right-5 h-8 w-8 cursor-pointer rounded-xl bg-primary-200 leading-none transition-transform hover:-translate-y-1'
        //   onClick={sendMessage}
        // >
        //   <Send className='shrink-0 text-white' size={18} />
        // </div>
      )}
    </motion.div>
  );
};

export default memo(ChatTypeField);
