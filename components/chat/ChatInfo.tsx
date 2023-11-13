import { moduleExample, moduleNotes } from '@/constant';
import Image from 'next/image';
import React, { memo, useState } from 'react';

type Props = { step: number };

const ChatInfo = ({ step }: Props) => {
  const [tab, setTabs] = useState(0);
  return (
    <div className='flex w-full flex-col gap-y-7'>
      <div className='relative h-[320px] w-full'>
        <Image
          alt='chatavatar'
          src='/chatAvatar.png'
          fill
          className='object-contain'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      {/* tabs */}
      <div className='flex h-[48px] w-[332px] rounded-xl border border-shadow-border bg-shadow-50 p-1'>
        <div
          onClick={() => setTabs(0)}
          className={`${
            tab === 0 && 'bg-white'
          } flex-center h-full w-[50%] cursor-pointer rounded-xl hover:bg-white`}
        >
          Notes
        </div>
        <div
          onClick={() => setTabs(1)}
          className={`${
            tab === 1 && 'bg-white'
          } flex-center h-full w-[50%] cursor-pointer rounded-xl hover:bg-white`}
        >
          Examples
        </div>
      </div>
      {/* info */}
      <div className='flex h-[387px] w-full flex-col items-center rounded-xl border border-shadow-border p-5'>
        {tab === 1 ? (
          <p className='base-regular'>{moduleExample[step.toString()]}</p>
        ) : (
          <p className='base-regular'>{moduleNotes[step.toString()]}</p>
        )}
      </div>
    </div>
  );
};

export default memo(ChatInfo);
