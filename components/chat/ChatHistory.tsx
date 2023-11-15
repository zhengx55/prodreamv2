'use client';
import { ChatSteps, QuestionID } from '@/constant/enum';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useChatMessageContext } from '@/context/ChatMessageContext';
import { ChatQuestionIdMap } from '@/constant';

/**
 * 从history进入聊天界面时许重置sessionId 为概该聊天section的sessionId
 * @returns
 */

const ChatHistory = () => {
  const { setCurrentSteps, currentSteps, currentMessageList } =
    useChatMessageContext();

  return (
    <motion.div
      key='history-chat'
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.4 }}
      className='absolute right-0 top-11 hidden flex-col bg-white md:flex md:w-72 md:rounded-lg md:border md:border-shadow-border'
    >
      <h1 className='title-semibold mx-4 mt-4'>Chat History</h1>
      <div className='my-4 flex w-full flex-col gap-y-2 px-4'>
        {Object.entries(currentMessageList).map((item, index) => {
          return (
            <div
              className='flex cursor-pointer flex-col gap-y-1 rounded-xl p-2 hover:bg-primary-50'
              key={item[0]}
            >
              <h1 className='base-semibold'>
                Step{index + 1}:&nbsp; {ChatQuestionIdMap[item[0]]}
              </h1>
              <p className='subtle-medium line-clamp-1 text-shadow'>
                {Object.values(item[1])[0][0].message}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default memo(ChatHistory);
