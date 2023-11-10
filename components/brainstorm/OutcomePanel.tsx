'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RotbotLoader from '../root/RotbotLoader';
import { useAppSelector } from '@/store/storehooks';
import { selectBrainStormHistory } from '@/store/reducers/brainstormSlice';
import { Button } from '../ui/button';
import { Copy, Download, Trophy } from 'lucide-react';
import { countWords } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const OutcomePanel = () => {
  const history = useAppSelector(selectBrainStormHistory);
  const path = usePathname();
  const id = path.split('/')[path.split('/').length - 1];
  const [outcome, setOutcome] = useState<string>('');
  const [wordCount, setWordCount] = useState(0);
  useEffect(() => {
    if (history.template_id === id) {
      setOutcome(history.result);
      console.log(history.result);
      setWordCount(countWords(history.result));
    }
  }, [history, id]);
  return (
    <motion.div
      key={'outcome'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden py-4 pl-2 pr-6'
    >
      <div className=' relative h-full w-full overflow-y-auto rounded-md bg-white px-6 pb-14 pt-6 shadow-panel'>
        <div className='custom-scrollbar h-full w-full select-text overflow-y-auto'>
          {!outcome ? (
            <RotbotLoader
              label='Branstorming'
              labelClass='text-black-200 body-medium'
            />
          ) : (
            <p className='body-normal whitespace-pre-line px-4'>{outcome}</p>
          )}
        </div>

        <div className='flex-between absolute bottom-2 left-0 flex h-12 w-full px-6'>
          <div className='flex items-center gap-x-2'>
            <div className='tooltip'>
              <p className='small-semibold'>{wordCount} Words</p>
            </div>
            <div className='tooltip'>
              <Copy size={18} />
            </div>
            <div className='tooltip'>
              <Download size={18} />
            </div>
            <div className='tooltip'>
              <Trophy size={18} />
            </div>
            <Button size={'sm'}>Polish Now</Button>
          </div>
          <div className='tiny-medium rounded-md bg-shadow-border p-2 text-black-200'>
            The content above is synthesized by AI
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OutcomePanel;
