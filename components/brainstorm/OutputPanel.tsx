'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HistoryPanelCSR } from './HistoryPanel';

const OutputPanel = () => {
  const [tab, setTab] = useState<number>(0);
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
      <main className='mt-4 overflow-y-auto md:h-full md:w-full'>
        <AnimatePresence mode='wait'>
          {tab === 1 ? <HistoryPanelCSR /> : null}
        </AnimatePresence>
      </main>
    </>
  );
};

export default OutputPanel;
