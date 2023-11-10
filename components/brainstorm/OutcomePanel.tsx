'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RotbotLoader from '../root/RotbotLoader';
import { useAppSelector } from '@/store/storehooks';
import { selectBrainStormHistory } from '@/store/reducers/brainstormSlice';

const OutcomePanel = () => {
  const history = useAppSelector(selectBrainStormHistory);
  const [outcome, setOutcome] = useState<string>('');
  useEffect(() => {
    setOutcome(history.result);
  }, [history]);
  return (
    <motion.div
      key={'outcome'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden py-4 pl-2 pr-6'
    >
      <div className='custom-scrollbar h-full w-full select-text overflow-y-auto rounded-md bg-white p-6 shadow-panel'>
        {!outcome ? (
          <RotbotLoader
            label='Branstorming'
            labelClass='text-black-200 body-medium'
          />
        ) : (
          <p className='body-normal'>{outcome}</p>
        )}
      </div>
    </motion.div>
  );
};

export default OutcomePanel;
