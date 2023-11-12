import Image from 'next/image';
import React, { memo } from 'react';

type Props = {};

const ChatInfo = (props: Props) => {
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
      <div className='flex h-[48px] w-[332px] rounded-xl border-1 border-shadow-border p-1'>
        <div className='flex-center h-full w-[50%] cursor-pointer rounded-xl hover:bg-shadow-200'>
          Notes
        </div>
        <div className='flex-center h-full w-[50%] cursor-pointer rounded-xl hover:bg-shadow-200'>
          Examples
        </div>
      </div>
      {/* info */}
      <div className='flex h-[387px] w-full flex-col rounded-xl border-1 border-shadow-border'></div>
    </div>
  );
};

export default memo(ChatInfo);
