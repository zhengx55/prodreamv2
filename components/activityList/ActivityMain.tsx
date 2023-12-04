'use client';
import React, { useState } from 'react';
import { Separator } from '../ui/separator';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import { AnimatePresence } from 'framer-motion';

const ActivityMain = () => {
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <div className='flex h-[calc(100vh_-var(--top-nav-bar-height)_-142px)] py-4'>
      {/* Input Panel */}
      <AnimatePresence>{!fullScreen && <InputPanel />}</AnimatePresence>
      {!fullScreen && (
        <Separator orientation='vertical' className='bg-shadow-border' />
      )}
      {/* Output Panel */}
      {<OutputPanel fullScreen={fullScreen} setFullScreen={setFullScreen} />}
    </div>
  );
};

export default ActivityMain;
