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

type Props = {
  messageList: Question;
  sIdList: string[];
  setSIdList: (value: string) => void;
  currentMsgs: { from: 'mine' | 'robot'; message: string }[];
  setCurMsgs: (value: { from: 'mine' | 'robot'; message: string }) => void;
};

const ChatMessageList = ({
  messageList,
  currentMsgs,
  setCurMsgs,
  sIdList,
  setSIdList,
}: Props) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

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
        className='custom-scrollbar flex h-full w-full select-text flex-col gap-y-14 overflow-y-auto px-1 pb-[70px]'
      >
        {/* <ActivityMessage />
      <EditableMessage /> */}
        <RobotMessage message={messageList.welcome} />
        <RobotMessage message={messageList.question} />
        {currentMsgs.map((item, index) => {
          return (
            <Fragment key={`${index}-${item.from}`}>
              {item.from === 'mine' ? (
                <MineMessage message={item.message} />
              ) : (
                <RobotMessage message={item.message} />
              )}
            </Fragment>
          );
        })}
        {isMineMessageLoading && <MineMessagLoading />}
        {isRobotMessageLoading && <RobotMessageLoading />}
        <ChatTypeField
          onSendMessage={sendMessage}
          isSending={isSending}
          questionId={messageList.question_id}
          setMineMessageLoading={toggleMineMessageLoading}
          setRobotMessageLoading={toogleRobotMessageLoading}
          setCurrentMessageList={setCurMsgs}
          sIdList={sIdList}
          setSIdList={setSIdList}
        />
      </div>
    </>
  );
};

export default memo(ChatMessageList);
