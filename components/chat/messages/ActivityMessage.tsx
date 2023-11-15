'use client';
import React, { memo, useState } from 'react';
import ChatIconOption from '../ChatIconOption';
import { messageOptions } from '@/constant';
import { Button } from '@/components/ui/button';

type Props = {};

const ActivityMessage = (props: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className='flex w-[80%] min-w-[485px] flex-col self-start rounded-xl bg-shadow-200 p-4'>
      <p className='small-regular text-black-700'>
        Great! You can click Add Activity to add a new experience
      </p>
      <div className='flex-start mt-2'>
        <Button
          variant={'bold'}
          size={'sm'}
          onClick={() => {
            setShowOptions((prev) => !prev);
          }}
        >
          {showOptions ? 'Hide' : 'Show'} Activity
        </Button>
      </div>

      <div className='mt-4 flex flex-wrap gap-4'>
        {messageOptions.map((item) => (
          <ChatIconOption
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
