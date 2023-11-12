'use client';

import BackButton from '@/components/root/BackButton';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { motion } from 'framer-motion';

const ChatPanel = () => {
  const { updateCurrentRoute } = useChatNavigatorContext();
  return (
    <motion.main
      key={'introduction'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto px-0 pt-5 md:px-16 md:pt-20'
    >
      <BackButton onBack={() => updateCurrentRoute('introductions')} />
      {/* steps */}
      <h2 className='h3-semibold text-primary-200 md:self-start'>
        Step 1 of 5: Motivation
      </h2>
      <div className='flex gap-x-20'>
        {/* chatpanel leftscetion */}
        {/* chatpanel middlesection  */}
        {/* chatpanel chathistory */}
      </div>
    </motion.main>
  );
};

export default ChatPanel;
