import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import { useAnswerOptimize } from '@/query/query';
import Tooltip from '../root/Tooltip';

type Props = {
  questionId: string;
  value: string;
  onChangeHanlder: (fileld: string, value: string) => void;
  setDisableHandler: (field: string, value: boolean) => void;
  mode: 0 | 1;
};

const IconLoading = () => {
  return (
    <div className='flex-center relative h-fit w-fit'>
      <div className='h-[28px] w-[28px] animate-spin rounded-full border-[2px]  border-b-primary-200' />
      <Image
        src='/optimize_active.svg'
        alt='loading'
        width={16}
        height={16}
        className='absolute h-auto w-auto animate-pulse'
      />
    </div>
  );
};

const OptimizeBar = ({
  questionId,
  value,
  mode,
  setDisableHandler,
  onChangeHanlder,
}: Props) => {
  const { toast } = useToast();
  const { isPending: isOptPending, mutateAsync: OptimizeAnswer } =
    useAnswerOptimize();
  const handleOptimze = async () => {
    if (!value) {
      toast({
        variant: 'destructive',
        title: 'Please type something.',
      });
      return;
    }
    setDisableHandler(questionId, true);
    localStorage.setItem(questionId, value);
    const res = await OptimizeAnswer({
      question_id: questionId,
      answer: value,
      type: mode,
    });
    onChangeHanlder(questionId, res);
    setDisableHandler(questionId, false);
  };

  const onRedoHandler = (questionId: string) => {
    const memory_answer = localStorage.getItem(questionId);
    if (memory_answer) {
      onChangeHanlder(questionId, memory_answer);
      localStorage.removeItem(questionId);
    }
  };

  return (
    <div className='absolute bottom-0 right-0 z-10 flex h-10 justify-end gap-x-1 rounded-lg px-2'>
      {isOptPending ? (
        <IconLoading />
      ) : (
        <>
          <Tooltip tooltipContent='Revert'>
            <div
              onClick={() => onRedoHandler(questionId)}
              className='flex-center bg-primary h-[28px] w-[28px] cursor-pointer rounded-lg border border-shadow-border bg-white hover:bg-shadow-200'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M6.99516 4.59403L2.27617 9.28103C1.88617 9.67203 1.88617 10.328 2.27617 10.719L6.99516 15.406L8.40117 14L5.43216 11L16.9642 11.031C18.0882 11.031 18.9952 11.913 18.9952 13V18C18.9952 18.552 19.4432 19 19.9952 19C20.5472 19 20.9952 18.552 20.9952 18V13C20.9952 10.796 19.1782 9.03103 16.9642 9.03103L5.43216 9.00002L8.40117 6.00003L6.99516 4.59403Z'
                  fill='#4B454D'
                />
              </svg>
            </div>
          </Tooltip>
          <Tooltip tooltipContent='Expand'>
            <div
              onClick={handleOptimze}
              className='flex-center bg-primary h-[28px] w-[28px] cursor-pointer rounded-lg border border-shadow-border bg-white hover:bg-shadow-200'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M4.9989 4.88281C3.3419 4.88281 1.9989 6.22581 1.9989 7.88281V15.8828C1.9989 17.5398 3.3419 18.8828 4.9989 18.8828H18.9989C20.6559 18.8828 21.9989 17.5398 21.9989 15.8828V7.88281C21.9989 6.22581 20.6559 4.88281 18.9989 4.88281H4.9989ZM4.9989 6.88281H18.9989C19.5509 6.88281 19.9989 7.33081 19.9989 7.88281V15.8828C19.9989 16.4348 19.5509 16.8828 18.9989 16.8828H4.9989C4.4469 16.8828 3.9989 16.4348 3.9989 15.8828V7.88281C3.9989 7.33081 4.4469 6.88281 4.9989 6.88281ZM5.9989 7.88281C5.4469 7.88281 4.9989 8.33081 4.9989 8.88281C4.9989 9.43481 5.4469 9.88281 5.9989 9.88281C6.5509 9.88281 6.9989 9.43481 6.9989 8.88281C6.9989 8.33081 6.5509 7.88281 5.9989 7.88281ZM8.9989 7.88281C8.4469 7.88281 7.9989 8.33081 7.9989 8.88281C7.9989 9.43481 8.4469 9.88281 8.9989 9.88281C9.5509 9.88281 9.9989 9.43481 9.9989 8.88281C9.9989 8.33081 9.5509 7.88281 8.9989 7.88281ZM11.9989 7.88281C11.4469 7.88281 10.9989 8.33081 10.9989 8.88281C10.9989 9.43481 11.4469 9.88281 11.9989 9.88281C12.5509 9.88281 12.9989 9.43481 12.9989 8.88281C12.9989 8.33081 12.5509 7.88281 11.9989 7.88281ZM14.9989 7.88281C14.4469 7.88281 13.9989 8.33081 13.9989 8.88281C13.9989 9.43481 14.4469 9.88281 14.9989 9.88281C15.5509 9.88281 15.9989 9.43481 15.9989 8.88281C15.9989 8.33081 15.5509 7.88281 14.9989 7.88281ZM17.9989 7.88281C17.4469 7.88281 16.9989 8.33081 16.9989 8.88281V10.8828H14.9989C14.4469 10.8828 13.9989 11.3308 13.9989 11.8828C13.9989 12.4348 14.4469 12.8828 14.9989 12.8828H17.9989C18.5509 12.8828 18.9989 12.4348 18.9989 11.8828V8.88281C18.9989 8.33081 18.5509 7.88281 17.9989 7.88281ZM5.9989 10.8828C5.4469 10.8828 4.9989 11.3308 4.9989 11.8828C4.9989 12.4348 5.4469 12.8828 5.9989 12.8828C6.5509 12.8828 6.9989 12.4348 6.9989 11.8828C6.9989 11.3308 6.5509 10.8828 5.9989 10.8828ZM8.9989 10.8828C8.4469 10.8828 7.9989 11.3308 7.9989 11.8828C7.9989 12.4348 8.4469 12.8828 8.9989 12.8828C9.5509 12.8828 9.9989 12.4348 9.9989 11.8828C9.9989 11.3308 9.5509 10.8828 8.9989 10.8828ZM11.9989 10.8828C11.4469 10.8828 10.9989 11.3308 10.9989 11.8828C10.9989 12.4348 11.4469 12.8828 11.9989 12.8828C12.5509 12.8828 12.9989 12.4348 12.9989 11.8828C12.9989 11.3308 12.5509 10.8828 11.9989 10.8828ZM5.9989 13.8828C5.4469 13.8828 4.9989 14.3308 4.9989 14.8828C4.9989 15.4348 5.4469 15.8828 5.9989 15.8828C6.5509 15.8828 6.9989 15.4348 6.9989 14.8828C6.9989 14.3308 6.5509 13.8828 5.9989 13.8828ZM8.9989 13.8828C8.4469 13.8828 7.9989 14.3308 7.9989 14.8828C7.9989 15.4348 8.4469 15.8828 8.9989 15.8828H14.9989C15.5509 15.8828 15.9989 15.4348 15.9989 14.8828C15.9989 14.3308 15.5509 13.8828 14.9989 13.8828H8.9989ZM17.9989 13.8828C17.4469 13.8828 16.9989 14.3308 16.9989 14.8828C16.9989 15.4348 17.4469 15.8828 17.9989 15.8828C18.5509 15.8828 18.9989 15.4348 18.9989 14.8828C18.9989 14.3308 18.5509 13.8828 17.9989 13.8828Z'
                  fill='#4B454D'
                />
              </svg>
            </div>
          </Tooltip>
        </>
      )}
    </div>
  );
};

const TextOptimizeBar = dynamic(() => Promise.resolve(OptimizeBar), {
  ssr: false,
});
const MemoizedTextOptimizeBar = memo(TextOptimizeBar);

export { MemoizedTextOptimizeBar as TextOptimizeBar };
