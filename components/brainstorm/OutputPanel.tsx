'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Panel } from 'react-resizable-panels';
import HistoryPanel from './HistoryPanel';

const OutputPanel = () => {
  const [tab, setTab] = useState<number>(0);
  return (
    <Panel
      className='flex h-full w-full flex-col overflow-y-hidden px-6 pt-8'
      minSize={45}
      defaultSize={50}
    >
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
          {tab === 1 ? <HistoryPanel /> : null}
        </AnimatePresence>
      </main>
    </Panel>
  );
};

export default OutputPanel;
