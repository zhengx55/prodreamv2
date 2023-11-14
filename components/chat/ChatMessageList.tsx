import React, { memo, useCallback, useEffect } from 'react';
import EditableMessage from './messages/EditableMessage';
import {
  MineMessagLoading,
  RobotMessageLoading,
} from './messages/MessageLoading';
import ActivityMessage from './messages/ActivityMessage';
import { Question } from '@/types';
import MineMessage from './messages/MineMessage';
import RobotMessage from './messages/RobotMessage';
import ChatTypeField from './ChatTypeField';

type Props = {
  messageList: Question;
};

const ChatMessageList = ({ messageList }: Props) => {
  const handleMessageChange = useCallback((value: string) => {
    //
  }, []);
  useEffect(() => {
    const sse = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}answer_guide/`,
      { withCredentials: true }
    );
    function getChatData() {}
    sse.onmessage = (e) => console.log(JSON.parse(e.data));
    sse.onerror = () => {
      // error log here

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  return (
    <>
      <div className='custom-scrollbar flex w-full select-text flex-col gap-y-14 overflow-y-auto px-1 pb-[70px]'>
        {/* <ActivityMessage />
      <EditableMessage /> */}
        <RobotMessage message={messageList.welcome} />
        <RobotMessage message={messageList.question} />
        <MineMessage message='hello world' />
        {/* <RobotMessageLoading />
      <MineMessagLoading /> */}
        <ChatTypeField onSendMessage={handleMessageChange} />
      </div>
    </>
  );
};

export default memo(ChatMessageList);
