'use client';
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';

type Props = {};

const ActivityMain = (props: Props) => {
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <div className='flex h-[calc(100vh_-var(--top-nav-bar-height)_-142px)] py-4'>
      {/* Input Panel */}
      {!fullScreen && <InputPanel />}
      <Separator orientation='vertical' className='bg-shadow-border' />
      {/* Output Panel */}
      {<OutputPanel />}
    </div>
  );
};

export default ActivityMain;
