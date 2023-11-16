'use client';
import React, { memo } from 'react';
import ChatIconOption from '../ChatIconOption';
import { messageOptions } from '@/constant';

type Props = {
  currentSubSession: string | undefined;
  handleAddPreviousExp: (option: string) => void;
};

const ActivityMessage = ({
  currentSubSession,
  handleAddPreviousExp,
}: Props) => {
  return (
    <div className='flex w-[80%] min-w-[485px] flex-col self-start rounded-xl bg-shadow-200 p-4'>
      <p className='small-regular text-black-700'>
        Great! You can click Add Activity to add a new experience
      </p>

      <div className='mt-4 flex flex-wrap gap-4'>
        {messageOptions.map((item) => (
          <ChatIconOption
            onClickHandler={handleAddPreviousExp}
            currentSubSession={currentSubSession}
            theme={item.theme}
            title={item.title}
            icon={item.icon}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(ActivityMessage);
