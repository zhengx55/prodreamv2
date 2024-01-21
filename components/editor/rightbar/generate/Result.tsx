import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { AlertTriangle, Frown, RotateCw, Smile } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';

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
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef<NodeJS.Timeout>();

  useUnmount(() => {
    timeout.current && clearTimeout(timeout.current);
  });

  useEffect(() => {
    if (currentIndex < generatedResult.length) {
      timeout.current = setTimeout(() => {
        setCurrentText((prevText) => prevText + generatedResult[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 10);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [currentIndex, generatedResult]);

  return (
    <div className='mt-4 flex w-full flex-col rounded-t border border-shadow-border pt-3'>
      <p className='small-regular px-3 text-doc-font'>{currentText}</p>
      <Spacer y='24' />
      <div className='flex-between px-4'>
        <RotateCw
          onClick={handleGenerate}
          size={20}
          className='cursor-pointer text-doc-font hover:opacity-50'
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
            className='h-max w-max rounded border-doc-primary px-6 py-1 text-doc-primary'
          >
            Insert
          </Button>
        </div>
      </div>
      <Spacer y='12' />
      <div className='flex-between h-7 w-full rounded-b bg-border-50 px-2 py-1'>
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
    </div>
  );
};
export default memo(Result);
