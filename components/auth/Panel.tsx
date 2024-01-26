'use client';
import React, { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative flex h-full w-full flex-col rounded-[0] bg-white px-[36px] py-[36px] sm:px-[120px] sm:py-[60px] md:w-1/2'>
      {children}
    </div>
  );
};

export default Panel;
