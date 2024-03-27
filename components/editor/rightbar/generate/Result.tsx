import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Frown, RotateCw, Smile } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { clearTimeout, setTimeout } from 'worker-timers';

type Props = {
  generatedResult: string;
  handleGenerate: () => Promise<void>;
  handleDismiss: () => void;
  handleInsert: () => void;
};
const Result = ({
  generatedResult,
  handleDismiss,
  handleGenerate,
  handleInsert,
}: Props) => {
  const [isTyping, setIsTyping] = useState(true);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef<number>();

  useEffect(() => {
    if (currentIndex < generatedResult.length) {
      timeout.current = setTimeout(() => {
        setCurrentText((prevText) => prevText + generatedResult[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 15);
    } else {
      timeout.current && clearTimeout(timeout.current);
      setIsTyping(false);
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current as number);
        timeout.current = undefined;
      }
    };
  }, [currentIndex, generatedResult]);

  return (
    <div className='mt-4 flex w-full flex-col rounded-t border border-gray-200 pt-3'>
      <div className='small-regular whitespace-pre-wrap px-3 text-zinc-600'>
        {currentText}
      </div>
      <Spacer y='24' />
      {!isTyping && (
        <>
          <div className='flex-between px-4'>
            <RotateCw
              onClick={handleGenerate}
              size={20}
              className='cursor-pointer text-neutral-400 hover:opacity-50'
            />
            <div className='flex gap-x-2'>
              <Button
                variant={'outline'}
                className='h-max w-max rounded px-6 py-1'
                onClick={handleDismiss}
              >
                Dismiss
              </Button>
              <Button
                variant={'outline'}
                onClick={handleInsert}
                className='h-max w-max rounded border-violet-500 px-6 py-1 text-violet-500'
              >
                Insert
              </Button>
            </div>
          </div>
          <Spacer y='12' />
          <div className='flex-between h-7 w-full rounded-b bg-gray-200 px-2 py-1'>
            <div className='flex gap-x-2'>
              <AlertTriangle className='text-shadow' size={15} />
              <p className='subtle-regular text-shadow'>
                Al responses can be inaccurate or misleading.
              </p>
            </div>
            <div className='flex gap-x-2'>
              <Smile
                className='cursor-pointer text-shadow hover:opacity-50'
                size={15}
              />
              <Frown
                className='cursor-pointer text-shadow hover:opacity-50'
                size={15}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default memo(Result);
