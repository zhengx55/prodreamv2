import { motion } from 'framer-motion';
import React from 'react';

type Props = {};

const OutComePanel = (props: Props) => {
  return (
    <motion.div
      key='activity-output'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden py-4 pl-2 pr-6'
    >
      OutComePanel
    </motion.div>
  );
};

export default OutComePanel;
