'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import OutcomePanel from './OutcomePanel';
import dynamic from 'next/dynamic';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { useBrainStormContext } from '@/context/BrainStormProvider';
const MemoizedHistoryPanel = dynamic(() => import('./HistoryPanel'), {
  ssr: false,
});
const OutputPanel = () => {
  const [tab, setTab] = useState<number>(0);
  const printIndexRef = useRef<number>(0);
  const [animatedWordCount, setAnimatedWordCount] = useState(0);
  const { setHistoryData, setEassyResult } = useBrainStormContext();
  const IncrementWordCount = useCallback(() => {
    setAnimatedWordCount((prev) => prev + 1);
  }, []);

  const handleTabChange = useCallback((value: number) => {
    setTab(value);
  }, []);

  useUnmount(() => {
    setEassyResult('');
    setHistoryData({ template_id: '', result: '', questionAnswerPair: {} });
  });

  return (
    <>
      {/* tabs */}
      <div className='h-13 flex shrink-0 items-center gap-x-[10px] rounded-xl border border-shadow-border bg-white p-1 md:h-12 md:w-[60%]'>
        <div
          className={cn(
            'tab-default',
            tab === 0 && 'bg-primary-50 text-primary-200'
          )}
          onClick={() => setTab(0)}
        >
          New Output
        </div>
        <div
          className={cn(
            'tab-default',
            tab === 1 && 'bg-primary-50 text-primary-200'
          )}
          onClick={() => setTab(1)}
        >
          History
        </div>
        <div
          className={cn(
            'tab-default',
            tab === 2 && 'bg-primary-50 text-primary-200'
          )}
          onClick={() => setTab(2)}
        >
          Tutorial
        </div>
      </div>
      <main className='overflow-y-auto md:h-full md:w-full'>
        <AnimatePresence mode='wait'>
          {tab === 1 ? (
            <MemoizedHistoryPanel handleTabChange={handleTabChange} />
          ) : tab === 0 ? (
            <OutcomePanel
              printIndexRef={printIndexRef}
              animatedWordCount={animatedWordCount}
              incrementCount={IncrementWordCount}
            />
          ) : null}
        </AnimatePresence>
      </main>
    </>
  );
};

export default OutputPanel;
