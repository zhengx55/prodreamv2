'use client';
import React, { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex w-[660px] flex-col rounded-[32px] bg-white p-10 '>
      {children}
    </div>
  );
};

export default Panel;
