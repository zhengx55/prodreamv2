'use client';
import React, { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex w-[90%] flex-col rounded-[32px] bg-white px-10 py-20 md:w-[570px] '>
      {children}
    </div>
  );
};

export default Panel;
