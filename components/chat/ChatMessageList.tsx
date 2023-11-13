import React, { memo } from 'react';
import EditableMessage from './messages/EditableMessage';
import {
  MineMessagLoading,
  RobotMessageLoading,
} from './messages/MessageLoading';
import ActivityMessage from './messages/ActivityMessage';

type Props = {};

const ChatMessageList = (props: Props) => {
  return (
    <div className='custom-scrollbar flex w-full select-text flex-col gap-y-14 overflow-y-auto px-1 pb-[70px]'>
      <ActivityMessage />
      <EditableMessage />
      <div className='base-regular flex max-w-[80%] self-end rounded-[20px] border-[3px] border-shadow-200 bg-white p-5 text-black-700'>
        Demo
      </div>

      <RobotMessageLoading />
      <MineMessagLoading />
    </div>
  );
};

export default memo(ChatMessageList);
