'use client';
import { Button } from '@/components/ui/button';
import React, { memo } from 'react';

type Props = { message: string };

const EditableMessage = ({ message }: Props) => {
  return (
    <div className='flex w-[80%] min-w-[485px] flex-col self-start rounded-[20px] bg-shadow-200 p-4'>
      <p className='small-regular text-black-700'>
        Here is the description for you!
      </p>
      <div className='small-regular mt-2 w-full rounded-[10px] bg-white p-4 text-justify shadow-panel'>
        {message}
      </div>
      <div className='flex-between mt-2 flex w-full'>
        <div className='flex gap-x-2'>
          <Button variant={'bold'} size={'sm'}>
            Regenrate
          </Button>
          <Button variant={'bold'} size={'sm'}>
            Edit
          </Button>
        </div>
        <Button size={'sm'}>😊 Looks Good</Button>
      </div>
    </div>
  );
};

export default memo(EditableMessage);
