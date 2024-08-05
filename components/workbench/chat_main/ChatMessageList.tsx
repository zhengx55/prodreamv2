'use client';
import { memo } from 'react';

type Props = {};

const ChatMessageList = (props: Props) => {
  return (
    <div className='flex w-[800px] flex-1 flex-col self-center overflow-y-auto'></div>
  );
};

export default memo(ChatMessageList);
