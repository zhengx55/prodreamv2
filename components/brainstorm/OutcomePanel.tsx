import React from 'react';
import { motion } from 'framer-motion';
import RotbotLoader from '../root/RotbotLoader';

const OutcomePanel = () => {
  return (
    <motion.div
      key={'outcome'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden py-4 pl-2 pr-6'
    >
      <div className='custom-scrollbar h-full w-full overflow-y-auto rounded-md bg-white shadow-panel'>
        <RotbotLoader
          label='Branstorming'
          labelClass='text-black-200 body-medium'
        />
      </div>
    </motion.div>
  );
};

export default OutcomePanel;
