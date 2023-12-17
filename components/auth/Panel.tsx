'use client';
import React, { ReactNode } from 'react';

const Panel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='z-10 flex w-[90%] flex-col rounded-[32px] bg-white p-5 md:w-[450px] md:p-7'>
      {children}
    </div>
  );
};

export default Panel;
