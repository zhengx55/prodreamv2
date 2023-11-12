import React, { memo } from 'react';

type Props = {};

const ChatMessageList = (props: Props) => {
  return (
    <div className='custom-scrollbar flex w-full select-text flex-col gap-y-14 overflow-y-auto px-1 pb-[70px]'>
      <div className='flex w-[80%] self-start rounded-[20px] bg-shadow-200 px-3 py-3 font-[300] text-black-700'>
        Thanks for this information! Does the curriculum at Harvard interests
        you?
      </div>
      <div className='flex w-[80%] self-end rounded-[20px] border-3 border-shadow-200 bg-white px-3 py-3 font-[300] text-black-700'>
        the program&apos;s comprehensive curriculum, which covers statistical
        analysis, data mining, machine learning, and data visualization, will
        equip me with the essential skills to analyze complex data sets and
        extract actionable insights. These skills are not only valuable in
        today&apos;s business landscape but are also transferable across various
        industries, making the program at Harvard a highly attractive choice.
      </div>
      <div className='flex w-[80%] self-start rounded-[20px] bg-shadow-200 px-3 py-3 font-[300] text-black-700'>
        Thanks for this information! Does the curriculum at Harvard interests
        you?
      </div>
      <div className='flex w-[80%] self-end rounded-[20px] border-3 border-shadow-200 bg-white px-3 py-3 font-[300] text-black-700'>
        the program&apos;s comprehensive curriculum, which covers statistical
        analysis, data mining, machine learning, and data visualization, will
        equip me with the essential skills to analyze complex data sets and
        extract actionable insights. These skills are not only valuable in
        today&apos;s business landscape but are also transferable across various
        industries, making the program at Harvard a highly attractive choice.
      </div>
      <div className='flex w-[80%] self-start rounded-[20px] bg-shadow-200 px-3 py-3 font-[300] text-black-700'>
        Thanks for this information! Does the curriculum at Harvard interests
        you?
      </div>
      <div className='flex w-[80%] self-end rounded-[20px] border-3 border-shadow-200 bg-white px-3 py-3 font-[300] text-black-700'>
        the program&apos;s comprehensive curriculum, which covers statistical
        analysis, data mining, machine learning, and data visualization, will
        equip me with the essential skills to analyze complex data sets and
        extract actionable insights. These skills are not only valuable in
        today&apos;s business landscape but are also transferable across various
        industries, making the program at Harvard a highly attractive choice.
      </div>
    </div>
  );
};

export default memo(ChatMessageList);
