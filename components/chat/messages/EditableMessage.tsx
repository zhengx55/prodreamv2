'use client';
import { Button } from '@/components/ui/button';
import React, { memo } from 'react';

type Props = {};

const EditableMessage = (props: Props) => {
  return (
    <div className='flex w-[80%] min-w-[485px] flex-col self-start rounded-[20px] bg-shadow-200 p-5'>
      <p className='base-regular text-black-700'>
        Here is the description for your Extracurricular activity!
      </p>
      <div className='mt-4 h-60 w-full rounded-[10px] bg-white shadow-panel'></div>
      <div className='flex-between mt-4 flex w-full'>
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
