'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import MemoizedHistoryPanelCSR from './HistoryPanel';
import OutcomePanel from './OutcomePanel';
import { useAppDispatch } from '@/store/storehooks';
import { clearHistory } from '@/store/reducers/brainstormSlice';

const OutputPanel = ({ submitPending }: { submitPending: boolean }) => {
  const [tab, setTab] = useState<number>(0);
  const dispatch = useAppDispatch();
  const handleTabChange = useCallback((value: number) => {
    setTab(value);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearHistory());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <MemoizedHistoryPanelCSR handleTabChange={handleTabChange} />
          ) : tab === 0 ? (
            <OutcomePanel submitPending={submitPending} />
          ) : null}
        </AnimatePresence>
      </main>
    </>
  );
};

export default OutputPanel;
