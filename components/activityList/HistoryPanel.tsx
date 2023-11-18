import { Datum } from '@/query/type';
import { motion } from 'framer-motion';
import React from 'react';

const HistoryPanel = ({ history_data }: { history_data: Datum[] }) => {
  return (
    <motion.div
      key='activity-history'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='flex h-full w-full flex-col gap-y-5 overflow-hidden py-4 pl-2 pr-6'
    >
      {history_data.map((item) => (
        <div key={item.create_time}></div>
      ))}
    </motion.div>
  );
};

export default HistoryPanel;
