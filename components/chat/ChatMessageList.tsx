import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
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
import { useSendChat } from '@/query/query';

type Props = {
  messageList: Question;
};

const ChatMessageList = ({ messageList }: Props) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentMessageList, setCurrentMessageList] = useState<
    {
      from: 'mine' | 'robot';
      message: string;
    }[]
  >([]);
  const [isMineMessageLoading, setMineMessageLoading] =
    useState<boolean>(false);

  const [isRobotMessageLoading, setRobotMessageLoading] =
    useState<boolean>(false);

  const toggleMineMessageLoading = useCallback((value: boolean) => {
    setMineMessageLoading(value);
  }, []);

  const toogleRobotMessageLoading = useCallback((value: boolean) => {
    setRobotMessageLoading(value);
  }, []);

  const addCurrentMessage = useCallback(
    (value: { from: 'mine' | 'robot'; message: string }) => {
      setCurrentMessageList((prev) => [...prev, value]);
    },
    []
  );
  const {
    mutateAsync: sendMessage,
    isPending: isSending,
    isError: isSendError,
  } = useSendChat();

  return (
    <>
      <div className='custom-scrollbar flex w-full select-text flex-col gap-y-14 overflow-y-auto px-1 pb-[70px]'>
        {/* <ActivityMessage />
      <EditableMessage /> */}
        <RobotMessage message={messageList.welcome} />
        <RobotMessage message={messageList.question} />
        {currentMessageList.map((item, index) => {
          return (
            <Fragment key={`${index}-${item.from}`}>
              {item.from === 'mine' ? (
                isMineMessageLoading ? (
                  <MineMessagLoading />
                ) : (
                  <MineMessage message={item.message} />
                )
              ) : isRobotMessageLoading ? (
                <RobotMessageLoading />
              ) : (
                <RobotMessage message={item.message} />
              )}
            </Fragment>
          );
        })}
        {/* <RobotMessageLoading />
      <MineMessagLoading /> */}
        <ChatTypeField
          onSendMessage={sendMessage}
          isSending={isSending}
          questionId={messageList.question_id}
          setMineMessageLoading={toggleMineMessageLoading}
          setRobotMessageLoading={toogleRobotMessageLoading}
          setCurrentMessageList={addCurrentMessage}
        />
      </div>
    </>
  );
};

export default memo(ChatMessageList);
