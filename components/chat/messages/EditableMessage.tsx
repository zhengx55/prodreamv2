'use client';
import { Button } from '@/components/ui/button';
import { useChatMessageContext } from '@/context/ChatMessageContext';
import React, { memo } from 'react';

type Props = {
  message: string;
  clearCurrentSubseesion?: () => void;
  isExpSummary?: boolean;
};

const EditableMessage = ({
  message,
  isExpSummary,
  clearCurrentSubseesion,
}: Props) => {
  const { setCurrentSteps, currentSteps, setCurrentSeesion } =
    useChatMessageContext();

  return (
    <div className='flex w-[80%] min-w-[485px] flex-col self-start rounded-[20px] bg-shadow-200 p-4'>
      <p className='small-regular text-black-700'>
        Here is the description for you!
      </p>
      <div className='small-regular mt-2 w-full rounded-[10px] bg-white p-4 text-justify shadow-panel'>
        {message}
      </div>
      <div className='flex-between mt-2 flex w-full'>
        {/* <div className='flex gap-x-2'>
          <Button variant={'bold'} size={'sm'}>
            Regenrate
          </Button>
          <Button variant={'bold'} size={'sm'}>
            Edit
          </Button>
        </div> */}
        <Button
          size={'sm'}
          onClick={() => {
            if (!isExpSummary) {
              currentSteps < 5 && setCurrentSteps(currentSteps + 1);
            } else {
              // 清空当前subseesion and currentsessionId
              setCurrentSeesion(null);
              clearCurrentSubseesion!();
            }
          }}
        >
          😊 Looks Good
        </Button>
      </div>
    </div>
  );
};

export default memo(EditableMessage);
