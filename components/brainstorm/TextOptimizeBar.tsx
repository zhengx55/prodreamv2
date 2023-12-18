import { useAnswerOptimize } from '@/query/query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo } from 'react';
import { toast } from 'sonner';
import Tooltip from '../root/Tooltip';
import { Optimize, Revert } from './../root/SvgComponents';

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
      <div className='h-[30px] w-[30px] animate-spin rounded-full border-[2px]  border-b-primary-200' />
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
  const { isPending: isOptPending, mutateAsync: OptimizeAnswer } =
    useAnswerOptimize();

  const handleOptimze = async () => {
    if (!value) {
      toast.error('Please type something.');
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
              className='flex-center bg-primary h-[30px] w-[30px] cursor-pointer rounded-lg border border-shadow-border bg-white hover:bg-shadow-200'
            >
              <Revert />
            </div>
          </Tooltip>
          <Tooltip tooltipContent='Expand'>
            <div
              onClick={handleOptimze}
              className='flex-center bg-primary h-[30px] w-[30px] cursor-pointer rounded-lg border border-shadow-border bg-white hover:bg-shadow-200'
            >
              <Optimize />
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
