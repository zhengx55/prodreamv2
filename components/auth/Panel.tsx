'use client';
import React, { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative z-10 flex w-full flex-col rounded-[0] bg-white md:w-1/2 h-full sm:py-[60px] py-[36px] sm:px-[120px] px-[36px]'>
      {children}
    </div>
  );
};

export default Panel;
