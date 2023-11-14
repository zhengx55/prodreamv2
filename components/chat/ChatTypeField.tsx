'use client';
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  memo,
} from 'react';
import { Textarea } from '../ui/textarea';
import { motion } from 'framer-motion';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AnswerRequestParam } from '@/types';
import { usePathname } from 'next/navigation';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import Image from 'next/image';

function wait(milliseconds: number | undefined) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}
type Props = {
  isSending: boolean;
  questionId: string;
  setMineMessageLoading: (value: boolean) => void;
  setRobotMessageLoading: (value: boolean) => void;
  setCurrentMessageList: (value: {
    from: 'mine' | 'robot';
    message: string;
  }) => void;
  onSendMessage: UseMutateAsyncFunction<
    any,
    Error,
    AnswerRequestParam,
    unknown
  >;
  sIdList: string[];
  setSIdList: (value: string) => void;
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

const ChatTypeField = ({
  isSending,
  questionId,
  onSendMessage,
  setMineMessageLoading,
  setRobotMessageLoading,
  setCurrentMessageList,
  sIdList,
  setSIdList,
}: Props) => {
  const [message, setMessage] = useState<string>('');
  const [sessionId, setSessionId] = useState<string | null>(null);
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
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!ref.current) return;
    try {
      if (message.trim() !== '') {
        setMineMessageLoading(true);
        const response = await onSendMessage({
          questionid: questionId,
          sessionid: sessionId,
          templateid: template_id,
          message: message.trim(),
          formQuestionAnswer: formAnswers,
          previousSessionids: sIdList,
        });
        setMineMessageLoading(false);
        setCurrentMessageList({ from: 'mine', message });
        setRobotMessageLoading(true);
        await wait(1000);
        // reset textarea size
        setMessage('');
        ref.current.style.height = '58px';
        // get reader for stream decode
        const reader = response.body.getReader();
        const { value } = await reader.read();
        const chunk = new TextDecoder().decode(value);
        const jsonObjects = chunk.split('}{').map((item, index, array) => {
          if (index === 0) {
            return `${item}}`;
          } else if (index === array.length - 1) {
            return `{${item}`;
          } else {
            return `{${item}}`;
          }
        });
        const resultArray = jsonObjects.map((jsonString) =>
          JSON.parse(jsonString)
        );
        const newRobotMessage = resultArray
          .slice(0, -3)
          .map((item) => item.content_delta)
          .join('');
        setCurrentMessageList({ from: 'robot', message: newRobotMessage });
        setRobotMessageLoading(false);
        if (sessionId !== resultArray[0].session_id) {
          setSessionId(resultArray[0].session_id);
          setSIdList(resultArray[0].session_id);
        }
      }
    } catch (error) {
    } finally {
      setMineMessageLoading(false);
      setRobotMessageLoading(false);
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
        className='max-h-[220px] min-h-[58px] w-[99%] resize-none py-4 pl-10 pr-14 text-[16px] focus-visible:shadow-textarea focus-visible:ring-0'
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      {isSending ? (
        <ChatTypeLoading />
      ) : (
        <Image
          onClick={sendMessage}
          alt='chatsent'
          className='absolute bottom-4 right-5 cursor-pointer transition-transform hover:-translate-y-1'
          src='/telegram_fill.svg'
          width={23}
          height={24}
        />
      )}
    </motion.div>
  );
};

export default memo(ChatTypeField);
