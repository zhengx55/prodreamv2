'use client';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

const AnimatedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <motion.section
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className='flex-center relative flex flex-1'
    >
      {children}
    </motion.section>
  );
};

export default AnimatedLayout;
