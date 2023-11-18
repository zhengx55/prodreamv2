import { motion } from 'framer-motion';
import React from 'react';

type Props = {};

const TutorialPanel = (props: Props) => {
  return (
    <motion.div
      key='activity-tut'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='h-full w-full overflow-hidden py-4 pl-2 pr-6'
    >
      Tut
    </motion.div>
  );
};

export default TutorialPanel;
