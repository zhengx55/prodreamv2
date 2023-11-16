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
  const {
    currentMessageList,
    templateAnswers,
    setCurrentSeesion,
    currnetSessionId,
  } = useChatMessageContext();
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
    if (
      messageList.question_id &&
      currnetSessionId === null &&
      currentMessageList[messageList.question_id]
    ) {
      const session_id = Object.keys(
        currentMessageList[messageList.question_id]
      )[0];
      setCurrentSeesion(session_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMessageList, messageList.question_id]);

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
        <RobotMessage message={messageList.welcome} />
        <RobotMessage message={messageList.question} />
        {messageList.question_id === 'fe96cfa951c346b091c3d1681ad65957' && (
          <ActivityMessage />
        )}
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
        {templateAnswers.hasOwnProperty(messageList.question_id) && (
          <EditableMessage message={templateAnswers[messageList.question_id]} />
        )}
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
