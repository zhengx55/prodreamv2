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
import useDeepCompareEffect from 'use-deep-compare-effect';

type Props = {
  messageList: Question;
};

const ChatMessageList = ({ messageList }: Props) => {
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const {
    currentMessageList,
    templateAnswers,
    setCurrentSession,
    currnetSessionId,
    currentSubSession,
    clearSubSession,
    addSubSession,
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

  // !! HARD CODE FOR previous experience chat

  const [textDisabled, setTextDisabled] = useState(false);
  useEffect(() => {
    if (messageList.question_id === 'fe96cfa951c346b091c3d1681ad65957') {
      if (!currentSubSession) {
        setTextDisabled(true);
      } else {
        setTextDisabled(false);
      }
    } else {
      setTextDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList.question_id, currentSubSession]);

  const scrollToBottom = () => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop =
        chatPanelRef.current.scrollHeight - chatPanelRef.current.clientHeight;
    }
  };

  // 跳转聊天窗口获取从localstorage中获取session id
  // 如果当前窗口是previous experience 窗口需要把subsession 也给set回来
  useEffect(() => {
    if (
      messageList.question_id &&
      currentMessageList[messageList.question_id]
    ) {
      if (messageList.question_id !== 'fe96cfa951c346b091c3d1681ad65957') {
        console.log('设置当前聊天id');
        const session_id = Object.keys(
          currentMessageList[messageList.question_id]
        )[0];
        setCurrentSession(session_id);
      } else {
        console.log('设置当前聊天id');
        const session_id = Object.keys(
          currentMessageList[messageList.question_id]
        )[0];
        setCurrentSession(session_id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMessageList, messageList.question_id, currentSubSession]);

  useDeepCompareEffect(() => {
    scrollToBottom();
  }, [isMineMessageLoading, isRobotMessageLoading, templateAnswers]);

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

        {currentMessageList[messageList.question_id] && currnetSessionId
          ? currentMessageList[messageList.question_id][
              currnetSessionId
            ].message.map((item, index) => {
              return (
                <Fragment key={`${index}-${item.from}`}>
                  {item.from === 'mine' ? (
                    <MineMessage message={item.message} />
                  ) : (
                    <RobotMessage message={item.message} />
                  )}
                </Fragment>
              );
            })
          : null}
        {isMineMessageLoading && <MineMessagLoading />}
        {isRobotMessageLoading && <RobotMessageLoading />}
        {messageList.question_id !== 'fe96cfa951c346b091c3d1681ad65957'
          ? templateAnswers.hasOwnProperty(messageList.question_id) && (
              <EditableMessage
                message={templateAnswers[messageList.question_id]}
              />
            )
          : templateAnswers.hasOwnProperty(messageList.question_id) &&
            currnetSessionId &&
            templateAnswers[messageList.question_id][currnetSessionId] && (
              <EditableMessage
                isExpSummary
                clearCurrentSubseesion={clearSubSession}
                message={
                  templateAnswers[messageList.question_id][currnetSessionId!]
                }
              />
            )}
        {messageList.question_id === 'fe96cfa951c346b091c3d1681ad65957' &&
          !currentSubSession && (
            <ActivityMessage
              handleAddPreviousExp={addSubSession}
              currentSubSession={currentSubSession}
            />
          )}
      </div>
      <ChatTypeField
        onSendMessage={sendMessage}
        disable={textDisabled}
        isSending={isSending}
        questionId={messageList.question_id}
        setMineMessageLoading={toggleMineMessageLoading}
        setRobotMessageLoading={toogleRobotMessageLoading}
      />
    </>
  );
};

export default memo(ChatMessageList);
