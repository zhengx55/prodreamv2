'use client';

import ChatHistory from '@/components/chat/ChatHistory';
import ChatInfo from '@/components/chat/ChatInfo';
import ChatMessageList from '@/components/chat/ChatMessageList';
import ChatTypeField from '@/components/chat/ChatTypeField';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { ChatSteps } from '@/constant/enum';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

const ChatPanel = () => {
  const { updateCurrentRoute } = useChatNavigatorContext();
  const [steps, setSteps] = useState<number>(1);
  const handleMessageChange = useCallback((value: string) => {
    //
  }, []);
  const handleTabNavigation = useCallback(() => {
    if (steps >= 1 && steps < 5) {
      setSteps((prev) => prev + 1);
    }
  }, [steps]);

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
      className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto px-4 pt-5 md:pl-16 md:pr-4 md:pt-20'
    >
      <BackButton onBack={() => updateCurrentRoute('introductions')} />
      <Button
        onClick={handleTabNavigation}
        className='absolute right-12 top-12'
        size='expand'
      >
        Next
      </Button>
      {/* steps */}
      <h2 className='h3-semibold self-start text-primary-200'>
        Step {steps} of 5:{' '}
        {steps === 1
          ? ChatSteps.EDUCATION
          : steps === 2
            ? ChatSteps.EDUCATION
            : steps === 3
              ? ChatSteps.PLANNING
              : steps === 4
                ? ChatSteps.PREVIOUS
                : ChatSteps.REASON}
      </h2>
      {/* max-h-[calc(100vh_-var(--chatpanel-padding))] */}
      <div className='my-4 flex h-fit max-h-full w-full flex-col gap-x-8 md:flex-row'>
        {/* chatpanel leftscetion */}
        <div className='flex-[0.3] flex-col'>
          <ChatInfo step={steps} />
        </div>
        {/* chatpanel middlesection  */}
        <div className='relative flex h-full flex-[0.5] flex-col'>
          <ChatMessageList />
          <ChatTypeField onSendMessage={handleMessageChange} />
        </div>
        {/* chatpanel chathistory */}
        <ChatHistory onNavigation={handleTabChange} current={steps} />
      </div>
    </motion.section>
  );
};

export default ChatPanel;
