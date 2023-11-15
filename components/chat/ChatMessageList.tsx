import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { useChatMessageContext } from '@/context/ChatMessageContext';

type Props = {
  messageList: Question;
};

const ChatMessageList = ({ messageList }: Props) => {
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const { currentMessageList, currnetSessionId } = useChatMessageContext();
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

  const scrollToBottom = () => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop =
        chatPanelRef.current.scrollHeight - chatPanelRef.current.clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [isMineMessageLoading, isRobotMessageLoading]);

  const {
    mutateAsync: sendMessage,
    isPending: isSending,
    isError: isSendError,
  } = useSendChat();

  return (
    <>
      <div
        ref={chatPanelRef}
        className='custom-scrollbar flex h-full w-full select-text flex-col gap-y-4 overflow-y-auto px-2 pt-2'
      >
        {/* <ActivityMessage />
      <EditableMessage /> */}
        <RobotMessage message={messageList.welcome} />
        <RobotMessage message={messageList.question} />
        {currentMessageList[messageList.question_id] && currnetSessionId
          ? currentMessageList[messageList.question_id][currnetSessionId].map(
              (item, index) => {
                return (
                  <Fragment key={`${index}-${item.from}`}>
                    {item.from === 'mine' ? (
                      <MineMessage message={item.message} />
                    ) : (
                      <RobotMessage message={item.message} />
                    )}
                  </Fragment>
                );
              }
            )
          : null}

        {isMineMessageLoading && <MineMessagLoading />}
        {isRobotMessageLoading && <RobotMessageLoading />}
      </div>
      <ChatTypeField
        onSendMessage={sendMessage}
        isSending={isSending}
        questionId={messageList.question_id}
        setMineMessageLoading={toggleMineMessageLoading}
        setRobotMessageLoading={toogleRobotMessageLoading}
      />
    </>
  );
};

export default memo(ChatMessageList);
