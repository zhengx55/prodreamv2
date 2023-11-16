'use client';
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  memo,
  useEffect,
} from 'react';
import { Textarea } from '../ui/textarea';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AnswerRequestParam } from '@/types';
import { usePathname } from 'next/navigation';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import Image from 'next/image';
import { useChatMessageContext } from '@/context/ChatMessageContext';
import { useGetFinalAnswer } from '@/query/query';

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
  onSendMessage: UseMutateAsyncFunction<
    any,
    Error,
    AnswerRequestParam,
    unknown
  >;
};

const ChatTypeLoading = () => {
  return (
    <div className='absolute bottom-7 right-7 flex gap-x-1'>
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
}: Props) => {
  const {
    templateAnswers,
    setCurrentMessageList,
    setTemplateAnswers,
    setCurrentSeesion,
    currnetSessionId,
  } = useChatMessageContext();

  const [message, setMessage] = useState<string>('');
  const { formAnswers } = useChatNavigatorContext();
  const { mutateAsync: getFinalAnswer } = useGetFinalAnswer();
  const ref = useRef<HTMLTextAreaElement>(null);
  const path = usePathname();
  const template_id = path.split('/')[3];

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
          sessionid: currnetSessionId,
          templateid: template_id,
          message: message.trim(),
          formQuestionAnswer: formAnswers,
          previousSessionids: [],
        });
        if (currnetSessionId) {
          setCurrentMessageList(
            { from: 'mine', message },
            questionId,
            currnetSessionId
          );
          setMineMessageLoading(false);
          setMessage('');
          ref.current.style.height = '48px';
        }
        setRobotMessageLoading(true);
        await wait(1000);
        // reset textarea size

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

        if (!currnetSessionId) {
          setCurrentMessageList(
            { from: 'mine', message },
            questionId,
            resultArray[0].session_id
          );
          setMessage('');
          ref.current.style.height = '48px';
          setMineMessageLoading(false);
        }
        setCurrentMessageList(
          { from: 'robot', message: newRobotMessage },
          questionId,
          resultArray[0].session_id
        );
        setRobotMessageLoading(false);
        if (currnetSessionId !== resultArray[0].session_id) {
          setCurrentSeesion(resultArray[0].session_id);
        }
        const is_finshed =
          resultArray[resultArray.length - 1].next_step === 'finish';
        if (is_finshed) {
          const response = await getFinalAnswer(currnetSessionId!);
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
          if (templateAnswers[questionId] !== resultArray[0].content_delta) {
            setTemplateAnswers(questionId, resultArray[0].content_delta);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMineMessageLoading(false);
      setRobotMessageLoading(false);
    }
  };

  return (
    <div className='relative w-full bg-white px-2 py-2'>
      <Textarea
        ref={ref}
        rows={1}
        disabled={isSending}
        placeholder='Type to chat with Max!'
        className='max-h-[220px] min-h-[48px] w-[99%] resize-none overflow-hidden py-3 pl-4 pr-14 text-[14px] focus-visible:shadow-textarea focus-visible:ring-0'
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />

      {isSending ? (
        <ChatTypeLoading />
      ) : message.trim() === '' ? (
        <Image
          alt='chatsent'
          className='absolute bottom-5 right-7'
          src='/telegram_fill.svg'
          width={23}
          height={24}
        />
      ) : (
        <div
          className='flex-center absolute bottom-5 right-7 h-6 w-6 cursor-pointer rounded-lg bg-primary-200 transition-transform hover:-translate-y-1'
          onClick={sendMessage}
        >
          <Image alt='chatsent' src='/telegram.svg' width={18} height={18} />
        </div>
      )}
    </div>
  );
};

export default memo(ChatTypeField);
