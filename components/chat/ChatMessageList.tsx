import React, { memo } from 'react';
import ChatIconOption from './ChatIconOption';
import { messageOptions } from '@/constant';

type Props = {};

const RobotMessageLoading = () => {
  return (
    <div className='flex gap-x-1 self-start rounded-[20px] bg-shadow-200 px-3 py-4'>
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-100' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-200' />
    </div>
  );
};

const MineMessagLoading = () => {
  return (
    <div className='flex gap-x-1 self-end rounded-[20px] border border-shadow-200 bg-white px-3 py-4'>
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-100' />
      <span className='h-3 w-3 animate-bounce rounded-full bg-dot delay-200' />
    </div>
  );
};

const ChatMessageList = (props: Props) => {
  return (
    <div className='custom-scrollbar flex w-full select-text flex-col gap-y-14 overflow-y-auto px-1 pb-[70px]'>
      <div className='flex w-[80%] flex-col self-start rounded-[20px] bg-shadow-200 p-6'>
        <p className='font-[300] text-black-700'>
          Thanks for this information! Does the curriculum at Harvard interests
          you?
        </p>
        <div className='mt-2 flex flex-wrap gap-4'>
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
      <div className='flex w-[80%] self-end rounded-[20px] border-[3px] border-shadow-200 bg-white p-6 font-[300] text-black-700'>
        the program&apos;s comprehensive curriculum, which covers statistical
        analysis, data mining, machine learning, and data visualization, will
        equip me with the essential skills to analyze complex data sets and
        extract actionable insights. These skills are not only valuable in
        today&apos;s business landscape but are also transferable across various
        industries, making the program at Harvard a highly attractive choice.
      </div>

      <RobotMessageLoading />
      <MineMessagLoading />
    </div>
  );
};

export default memo(ChatMessageList);
