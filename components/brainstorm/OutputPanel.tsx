'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import MemoizedHistoryPanelCSR from './HistoryPanel';
import OutcomePanel from './OutcomePanel';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import { clearHistory } from '@/store/reducers/brainstormSlice';
import { useQueryEssay } from '@/query/query';
import { clearEssay, selectTaskId } from '@/store/reducers/essaySlice';

const OutputPanel = ({
  submitPending,
  submitError,
}: {
  submitPending: boolean;
  submitError: boolean;
}) => {
  const [tab, setTab] = useState<number>(0);
  const dispatch = useAppDispatch();
  const printIndexRef = useRef<number>(0);
  const task_id = useAppSelector(selectTaskId);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [animatedWordCount, setAnimatedWordCount] = useState(0);

  const IncrementWordCount = useCallback(() => {
    setAnimatedWordCount((prev) => prev + 1);
  }, []);
  // hooks to calculate incremental word count
  const turnOffAnimate = useCallback(() => {
    setShouldAnimate(false);
  }, []);
  const handleTabChange = useCallback((value: number) => {
    setTab(value);
  }, []);

  const {
    refetch: essayRefetch,
    data: queryEssay,
    error,
  } = useQueryEssay(task_id);

  useEffect(() => {
    const pollInterval = setInterval(() => {
      setShouldAnimate(true);
      if (queryEssay?.status === 'doing') {
        essayRefetch();
      }
      if (queryEssay?.status === 'done') {
        clearInterval(pollInterval);
      }
    }, 2000);
    return () => {
      clearInterval(pollInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryEssay?.status]);

  useEffect(() => {
    return () => {
      dispatch(clearHistory());
      dispatch(clearEssay());
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
            <OutcomePanel
              isSubmitError={submitError}
              printIndexRef={printIndexRef}
              shouldAnimate={shouldAnimate}
              turnOffAnimate={turnOffAnimate}
              submitPending={submitPending}
              essaydata={queryEssay?.text ?? ''}
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
