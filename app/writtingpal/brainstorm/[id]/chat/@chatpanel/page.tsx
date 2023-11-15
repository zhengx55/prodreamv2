'use client';
import ChatHistory from '@/components/chat/ChatHistory';
import ChatInfo from '@/components/chat/ChatInfo';
import ChatMessageList from '@/components/chat/ChatMessageList';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { ChatSteps } from '@/constant/enum';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { IChatMessage, IChatMesssageList } from '@/query/type';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const ChatPanel = () => {
  const { questions, isQusetionFetchError, updateCurrentRoute } =
    useChatNavigatorContext();
  const [steps, setSteps] = useState<number>(1);
  const handleTabNavigation = useCallback(() => {
    if (steps >= 1 && steps < 5) {
      setSteps((prev) => prev + 1);
    }
  }, [steps]);
  const [sessionIdList, setSessionIdList] = useState<string[]>([]);
  const [currentMessageList, setCurrentMessageList] =
    useState<IChatMesssageList>(() => {
      const memory = localStorage.getItem('chat_history');
      return memory ? JSON.parse(memory) : {};
    });

  // !test
  useEffect(() => {
    if (Object.keys(currentMessageList).length !== 0) {
      console.log('聊天已放入存储');
      localStorage.setItem('chat_history', JSON.stringify(currentMessageList));
    }
  }, [currentMessageList]);

  const addCurrentMessage = useCallback(
    (value: IChatMessage, question_id: string) => {
      setCurrentMessageList((prevState) => {
        if (prevState[question_id]) {
          return {
            ...prevState,
            [question_id]: [...prevState[question_id], value],
          };
        } else {
          return {
            ...prevState,
            [question_id]: [value],
          };
        }
      });
    },
    []
  );

  const addSessionIdList = useCallback((value: string) => {
    setSessionIdList((prev) => [...prev, value]);
  }, []);

  const handleTabChange = useCallback((value: number) => {
    setSteps(value);
  }, []);
  return (
    <motion.section
      key={'introduction'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='relative flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto px-4 pt-5 md:px-10 md:pt-10'
    >
      {/* steps */}
      <h2 className='h3-semibold self-start text-primary-200'>
        Step {steps} of 5:&nbsp;
        {steps === 1
          ? ChatSteps.MOVTIVATION
          : steps === 2
            ? ChatSteps.EDUCATION
            : steps === 3
              ? ChatSteps.PLANNING
              : steps === 4
                ? ChatSteps.PREVIOUS
                : ChatSteps.REASON}
      </h2>
      <div className='my-4 flex h-full max-h-full w-full overflow-y-hidden md:flex-row'>
        {/* chatpanel leftscetion */}
        {!isQusetionFetchError && (
          <>
            <div className='flex-[0.25] flex-col'>
              <ChatInfo step={steps} />
            </div>
            {/* chatpanel middlesection  */}
            <div className='relative flex flex-[0.5] flex-col p-4 md:h-full md:rounded-bl-lg md:rounded-tl-lg md:border md:border-shadow-border'>
              <ChatMessageList
                sIdList={sessionIdList}
                setSIdList={addSessionIdList}
                currentMsgs={currentMessageList}
                setCurMsgs={addCurrentMessage}
                messageList={questions.questions[steps - 1]}
              />
            </div>
            {/* chatpanel chathistory */}
            <ChatHistory onNavigation={handleTabChange} current={steps} />
          </>
        )}
      </div>
      <div className='flex-between mb-10 mt-4 w-full'>
        <BackButton onBack={() => updateCurrentRoute('introductions')} />
        <Button
          onClick={handleTabNavigation}
          className='slef-end'
          size='expand'
        >
          Next
        </Button>
      </div>
    </motion.section>
  );
};

export default ChatPanel;
