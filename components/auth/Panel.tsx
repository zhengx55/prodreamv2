'use client';
import React, { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex w-[90%] flex-col rounded-[32px] bg-white p-5 md:w-[540px] md:p-10 '>
      {children}
    </div>
  );
};

export default Panel;
