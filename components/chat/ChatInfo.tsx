import { moduleExample, moduleNotes } from '@/constant';
import { useChatMessageContext } from '@/context/ChatMessageContext';
import Image from 'next/image';
import React, { memo, useState } from 'react';

const ChatInfo = () => {
  const [tab, setTabs] = useState(0);
  const { currentSteps } = useChatMessageContext();
  return (
    <div className='flex h-full w-full flex-col gap-y-8 md:pr-10'>
      <div className='relative h-80 w-full shrink-0 self-center rounded-lg bg-[#E7D1F9]'>
        <Image
          alt='chatavatar'
          src='/chatAvatar.png'
          fill
          className='object-contain'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      {/* tabs */}
      <div className='flex h-[48px] w-full shrink-0 rounded-xl border border-shadow-border p-1'>
        <div
          onClick={() => setTabs(0)}
          className={`${
            tab === 0 && 'bg-primary-50 text-primary-200'
          } flex-center base-medium h-full w-[50%] cursor-pointer rounded-xl text-black-300 hover:bg-white`}
        >
          Notes
        </div>
        <div
          onClick={() => setTabs(1)}
          className={`${
            tab === 1 && 'bg-primary-50 text-primary-200'
          } flex-center base-medium h-full w-[50%] cursor-pointer rounded-xl text-black-300 hover:bg-white`}
        >
          Examples
        </div>
      </div>
      {/* info */}
      <ul className='custom-scrollbar flex max-h-full w-full overflow-y-auto'>
        {tab === 1 ? (
          <li className='small-regular text-justify'>
            {moduleExample[currentSteps.toString()]}
          </li>
        ) : (
          <li className='small-regular text-justify'>
            {moduleNotes[currentSteps.toString()]}
          </li>
        )}
      </ul>
    </div>
  );
};

export default memo(ChatInfo);
