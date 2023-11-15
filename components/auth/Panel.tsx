'use client';
import React, { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex w-[90%] flex-col rounded-[32px] bg-white p-10 md:w-[540px] '>
      {children}
    </div>
  );
};

export default Panel;
