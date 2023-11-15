'use client';
import ChatHistory from '@/components/chat/ChatHistory';
import ChatInfo from '@/components/chat/ChatInfo';
import ChatMessageList from '@/components/chat/ChatMessageList';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { ChatSteps } from '@/constant/enum';
import { ChatMessageContext } from '@/context/ChatMessageContext';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { IChatMessage, IChatMesssageList, ISessionId } from '@/query/type';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarRange } from 'lucide-react';
import { useCallback, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const ChatPanel = () => {
  const { questions, isQusetionFetchError, updateCurrentRoute } =
    useChatNavigatorContext();
  const [steps, setSteps] = useState<number>(1);
  const [showHistory, setShowHistory] = useState(true);
  const [sessionMap, setSessionMap] = useState<ISessionId>(() => {
    const memory = localStorage.getItem('chat_session_ids');
    return memory ? JSON.parse(memory) : {};
  });
  const [currentMessageList, setCurrentMessageList] =
    useState<IChatMesssageList>(() => {
      const memory = localStorage.getItem('chat_history');
      return memory ? JSON.parse(memory) : {};
    });

  // !test
  useDeepCompareEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(currentMessageList));
  }, [currentMessageList]);

  useDeepCompareEffect(() => {
    localStorage.setItem('chat_session_ids', JSON.stringify(sessionMap));
  }, [sessionMap]);

  const handleTabNavigation = useCallback(() => {
    if (steps >= 1 && steps < 5) {
      setSteps((prev) => prev + 1);
    }
  }, [steps]);

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

  const addSessionIdLMap = useCallback(
    (value: string, question_id: string, step: number) => {
      setSessionMap((prevState) => ({
        ...prevState,
        [question_id]: { session_id: value, step },
      }));
    },
    []
  );

  const handleTabChange = useCallback((value: number) => {
    setSteps(value);
  }, []);

  return (
    <ChatMessageContext.Provider
      value={{
        currentMessageList: currentMessageList,
        setCurrentMessageList: addCurrentMessage,
        currentSteps: steps,
        setCurrentSteps: handleTabChange,
        sessionMap: sessionMap,
        setSessionMap: addSessionIdLMap,
      }}
    >
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
        <div className='relative my-4 flex h-full max-h-full w-full overflow-y-hidden'>
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
                {showHistory && <ChatHistory />}
              </AnimatePresence>
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
    </ChatMessageContext.Provider>
  );
};

export default ChatPanel;
