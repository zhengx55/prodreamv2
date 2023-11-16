'use client';
import ChatHistory from '@/components/chat/ChatHistory';
import ChatInfo from '@/components/chat/ChatInfo';
import ChatMessageList from '@/components/chat/ChatMessageList';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { ChatSteps } from '@/constant/enum';
import { ChatMessageContext } from '@/context/ChatMessageContext';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { IChatMessage, IChatMesssageList } from '@/query/type';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarRange } from 'lucide-react';
import { useCallback, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const ChatPanel = () => {
  const { questions, isQusetionFetchError, updateCurrentRoute } =
    useChatNavigatorContext();
  const [steps, setSteps] = useState<number>(1);
  const [showHistory, setShowHistory] = useState(false);
  const [currentSessionId, setCurrnetSessionId] = useState<string | null>(null);
  const [templateAnswers, setTemplateAnswers] = useState<
    Record<string, string>
  >(() => {
    const memory = localStorage.getItem('chat_summary');
    return memory ? JSON.parse(memory) : {};
  });

  const [currentMessageList, setCurrentMessageList] =
    useState<IChatMesssageList>(() => {
      const memory = localStorage.getItem('chat_history');
      return memory ? JSON.parse(memory) : {};
    });

  // !test

  useDeepCompareEffect(() => {
    localStorage.setItem('chat_summary', JSON.stringify(templateAnswers));
  }, [templateAnswers]);

  useDeepCompareEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(currentMessageList));
  }, [currentMessageList]);

  const handleCloseHistory = useCallback(() => {
    setShowHistory(false);
  }, []);

  const handleTabNavigation = useCallback(() => {
    // 当进入下一个聊天引导时清空上一个sessionid 已进入新的聊天窗口并记录上一个sessionId
    if (steps >= 1 && steps < 5) {
      setCurrnetSessionId(null);
      setSteps((prev) => prev + 1);
    }
  }, [steps]);

  const setFinalAnswer = useCallback((question_id: string, answer: string) => {
    setTemplateAnswers((prev) => ({ ...prev, [question_id]: answer }));
  }, []);

  const handleNavBack = () => {
    if (steps === 1) {
      updateCurrentRoute('introductions');
    } else {
      setSteps((prev) => prev - 1);
      setCurrnetSessionId(null);
    }
  };

  const setCurrentSession = useCallback((value: string | null) => {
    setCurrnetSessionId(value);
  }, []);

  const addCurrentMessage = useCallback(
    (value: IChatMessage, question_id: string, session_id: string) => {
      setCurrentMessageList((prevState) => {
        const isKey1Exist = prevState.hasOwnProperty(question_id);
        if (isKey1Exist) {
          const isKey2Exist = prevState[question_id].hasOwnProperty(session_id);
          if (isKey2Exist) {
            return {
              ...prevState,
              [question_id]: {
                ...prevState[question_id],
                [session_id]: [...prevState[question_id][session_id], value],
              },
            };
          }
          return {
            ...prevState,
            [question_id]: {
              ...prevState[question_id],
              [session_id]: [value],
            },
          };
        }
        return {
          ...prevState,
          [question_id]: {
            [session_id]: [value],
          },
        };
      });
    },
    []
  );

  const handleTabChange = useCallback(
    (value: number) => {
      if (steps !== value) {
        setSteps(value);
        setCurrnetSessionId(null);
      }
    },
    [steps]
  );

  return (
    <ChatMessageContext.Provider
      value={{
        currentMessageList: currentMessageList,
        currnetSessionId: currentSessionId,
        setCurrentSeesion: setCurrentSession,
        setCurrentMessageList: addCurrentMessage,
        currentSteps: steps,
        setCurrentSteps: handleTabChange,
        setTemplateAnswers: setFinalAnswer,
        templateAnswers: templateAnswers,
      }}
    >
      <motion.section
        key={'introduction'}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='md:custom-scrollbar relative flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col items-center px-4 pt-5 md:overflow-y-auto md:px-10 md:pt-10'
      >
        {/* steps */}
        <h2 className='h3-semibold self-start text-primary-200'>
          Step {steps} of 5:&nbsp;
          {steps === 1
            ? ChatSteps.MOVTIVATION
            : steps === 2
              ? ChatSteps.EDUCATION
              : steps === 3
                ? ChatSteps.PREVIOUS
                : steps === 4
                  ? ChatSteps.REASON
                  : ChatSteps.PLANNING}
        </h2>
        <div className='relative my-4 flex h-full max-h-[700px] min-h-[600px] w-full flex-col md:flex-row '>
          {/* chatpanel leftscetion */}
          {!isQusetionFetchError && (
            <>
              <div className='flex-[0.5] flex-col'>
                <ChatInfo />
              </div>
              {/* chatpanel middlesection  */}
              <div className='relative flex flex-[0.5] flex-col md:h-full md:rounded-lg md:border md:border-shadow-border'>
                <div className='flex-between h-12 w-full border-b border-shadow-border px-4'>
                  <h3 className='title-semibold'>Guidance</h3>
                  <div
                    className='small-semibold flex cursor-pointer items-center gap-x-2 text-shadow-100 hover:text-primary-200'
                    onClick={() => setShowHistory((prev) => !prev)}
                  >
                    <CalendarRange size={20} />
                    View Chat History
                  </div>
                </div>
                <ChatMessageList messageList={questions.questions[steps - 1]} />
              </div>
              {/* chatpanel chathistory */}
              <AnimatePresence initial={false}>
                {showHistory && (
                  <ChatHistory handleCloseHistory={handleCloseHistory} />
                )}
              </AnimatePresence>
            </>
          )}
        </div>
        <div className='flex-between mb-4 mt-4 w-full md:mb-10'>
          <BackButton onBack={handleNavBack} />
          <Button
            disabled={
              !templateAnswers.hasOwnProperty(
                questions.questions[steps - 1].question_id
              )
            }
            onClick={handleTabNavigation}
            className='slef-end'
            size='expand'
          >
            Next
          </Button>
        </div>
      </motion.section>
    </ChatMessageContext.Provider>
  );
};

export default ChatPanel;
