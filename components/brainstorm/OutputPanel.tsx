'use client';
import { cn } from '@/lib/utils';
import { IBrainstormHistory } from '@/query/type';
import useRootStore from '@/zustand/store';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import Spacer from '../root/Spacer';
const HistoryPanel = dynamic(() => import('./HistoryPanel'));
const OutcomePanel = dynamic(() => import('./OutcomePanel'));
const TutorialPanel = dynamic(() => import('./TutorialPanel'));

const OutputPanel = ({ history }: { history: IBrainstormHistory }) => {
  const [tab, setTab] = useState<number>(0);
  const printIndexRef = useRef<number>(0);
  const [animatedWordCount, setAnimatedWordCount] = useState(0);
  const IncrementWordCount = useCallback(() => {
    setAnimatedWordCount((prev) => prev + 1);
  }, []);
  const resetbsData = useRootStore((state) => state.resetbsData);
  const handleTabChange = useCallback((value: number) => {
    setTab(value);
  }, []);

  useUnmount(() => {
    resetbsData();
  });

  return (
    <>
      {/* tabs */}
      <div className='h-13 flex shrink-0 items-center gap-x-[10px] rounded-xl border border-shadow-border bg-white p-1 md:h-12 md:w-[60%]'>
        <span
          className={cn(
            'tab-default',
            tab === 0 && 'bg-primary-50 text-primary-200'
          )}
          onClick={() => setTab(0)}
        >
          New Output
        </span>
        <span
          className={cn(
            'tab-default',
            tab === 1 && 'bg-primary-50 text-primary-200'
          )}
          onClick={() => setTab(1)}
        >
          History
        </span>
        <span
          className={cn(
            'tab-default',
            tab === 2 && 'bg-primary-50 text-primary-200'
          )}
          onClick={() => setTab(2)}
        >
          Tutorial
        </span>
      </div>
      <Spacer y='20' />
      <main className='h-full w-full overflow-y-auto'>
        <AnimatePresence mode='wait'>
          {tab === 1 ? (
            <HistoryPanel data={history} handleTabChange={handleTabChange} />
          ) : tab === 0 ? (
            <OutcomePanel
              printIndexRef={printIndexRef}
              animatedWordCount={animatedWordCount}
              incrementCount={IncrementWordCount}
            />
          ) : (
            <TutorialPanel handleTabChange={handleTabChange} />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default OutputPanel;
