'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import OutComePanel from './OutComePanel';
import HistoryPanel from './HistoryPanel';
import TutorialPanel from './TutorialPanel';
import { Datum } from '@/query/type';

const OutputPanel = ({ history_data }: { history_data: Datum[] }) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className='h-full w-1/2 md:p-4'>
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
            <OutComePanel />
          ) : tab === 0 ? (
            <HistoryPanel history_data={history_data} />
          ) : (
            <TutorialPanel />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OutputPanel;
