'use client';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ReactNode } from 'react';

const AnimatedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
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
      </m.section>
    </LazyMotion>
  );
};

export default AnimatedLayout;
