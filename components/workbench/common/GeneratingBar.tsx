import Icon from '@/components/root/Icon';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import { RotateCw, StopCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const ReactTyped = dynamic(
  () => import('react-typed').then((mod) => mod.ReactTyped),
  { ssr: false }
);

const GeneratingBar = () => {
  const editorContentGenerating = useEditor(
    (state) => state.editorContentGenerating
  );
  const setRecreateSignal = useEditor((state) => state.setRecreateSignal);
  const abort = useEditor((state) => state.abortGenerating);
  return (
    <LazyMotionProvider>
      <AnimatePresence>
        {editorContentGenerating && (
          <m.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='flex-between absolute bottom-2 h-11 w-[60%] rounded-lg border border-zinc-200 bg-slate-50 px-2.5'
          >
            <div className='flex items-center gap-x-2'>
              <Icon
                alt='loading'
                src='/editor/copilot.svg'
                width={20}
                height={20}
                className='size-[18px]'
              />
              <span className='small-regular text-indigo-500'>
                AI is writing
              </span>
              <ReactTyped
                strings={['...']}
                typeSpeed={30}
                backSpeed={30}
                backDelay={100}
                loop
                className='text-indigo-500'
              />
            </div>
            <div className='flex items-center gap-x-2'>
              <Button
                onClick={() => {
                  abort();
                  setRecreateSignal(true);
                }}
                variant={'icon'}
                className='px-2 text-neutral-400'
              >
                <RotateCw size={16} />
                Try Again
              </Button>
              <Button
                onClick={abort}
                variant={'icon'}
                className='px-2 text-neutral-400'
              >
                <StopCircle size={16} />
                Stop
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotionProvider>
  );
};

export default memo(GeneratingBar);
