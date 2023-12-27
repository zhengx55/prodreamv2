'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Separator } from '../ui/separator';

const InputPanel = dynamic(() => import('./InputPanel'));
const OutputPanel = dynamic(() => import('./OutputPanel'));

const ActivityMain = () => {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div className='flex h-[calc(100%_-var(--top-nav-bar-height)_-20px)] py-4'>
      {/* Input Panel */}
      <InputPanel fullScreen={fullScreen} />
      {!fullScreen && (
        <Separator orientation='vertical' className='bg-shadow-border' />
      )}
      {/* Output Panel */}
      {<OutputPanel fullScreen={fullScreen} setFullScreen={setFullScreen} />}
    </div>
  );
};

export default ActivityMain;
