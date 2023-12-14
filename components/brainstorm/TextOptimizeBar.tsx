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
    <div className='absolute bottom-0 right-0 z-10 flex h-12 justify-end rounded-lg px-2 py-1'>
      <div className='flex-center h-full gap-x-1 rounded-t-full rounded-bl-full border border-shadow-border bg-white px-2'>
        {isOptPending ? (
          <IconLoading />
        ) : (
          <>
            <Tooltip tooltipContent='Undo'>
              <div className='flex-center bg-primary h-[28px] w-[28px] rounded-full bg-shadow-100 hover:bg-primary-200'>
                <Image
                  src='/reply.svg'
                  onClick={() => onRedoHandler(questionId)}
                  alt='reply'
                  width={24}
                  height={24}
                />
              </div>
            </Tooltip>
            <Tooltip tooltipContent='expand'>
              <div className='flex-center bg-primary h-[28px] w-[28px] rounded-full bg-shadow-100 hover:bg-primary-200'>
                <Image
                  onClick={handleOptimze}
                  src='/optimize.svg'
                  alt='polish'
                  width={20}
                  height={20}
                />
              </div>
            </Tooltip>
            <div className='flex-center bg-primary h-[28px] w-[28px] rounded-full bg-primary-200'>
              <Image
                src='/robotoutline.png'
                alt='robot'
                width={24}
                height={24}
                priority
                className='h-auto w-auto'
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TextOptimizeBar = dynamic(() => Promise.resolve(OptimizeBar), {
  ssr: false,
});
const MemoizedTextOptimizeBar = memo(TextOptimizeBar);

export { MemoizedTextOptimizeBar as TextOptimizeBar };
