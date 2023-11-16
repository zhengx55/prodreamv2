'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useChatMessageContext } from '@/context/ChatMessageContext';
import { ChatQuestionIdMap } from '@/constant';
import { X } from 'lucide-react';

/**
 * 从history进入聊天界面时许重置sessionId 为概该聊天section的sessionId
 * @returns
 */

const ChatHistory = ({
  handleCloseHistory,
}: {
  handleCloseHistory: () => void;
}) => {
  const {
    setCurrentSteps,
    setCurrentSession,
    addSubSession,
    currentMessageList,
  } = useChatMessageContext();
  const handleSessionNavigation = (index: number) => {
    setCurrentSteps(index + 1);
  };
  return (
    <motion.div
      key='history-chat'
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.2 }}
      className='absolute right-0 top-11 hidden flex-col bg-white md:flex md:w-72 md:rounded-lg md:border md:border-shadow-border'
    >
      <div className='flex-between mx-4 mt-4'>
        <h1 className='title-semibold'>Chat History</h1>
        <X
          className='cursor-pointer text-shadow-100'
          onClick={handleCloseHistory}
        />
      </div>
      <div className='my-4 flex w-full flex-col gap-y-2 px-4'>
        {Object.entries(currentMessageList).map((item, index) => {
          return (
            <div
              className={`${
                Object.values(item[1])[0].title === ''
                  ? 'hover:bg-primary-50'
                  : ''
              } flex cursor-pointer flex-col gap-y-1 rounded-xl p-2`}
              key={item[0]}
              onClick={() => {
                Object.values(item[1])[0].title === ''
                  ? handleSessionNavigation(index)
                  : null;
              }}
            >
              <h1 className='small-semibold capitalize'>
                Step {index + 1}:&nbsp; {ChatQuestionIdMap[item[0]]}
              </h1>
              {Object.values(item[1])[0].title === '' ? (
                <p className='subtle-medium line-clamp-1 text-shadow'>
                  {Object.values(item[1])[0].message[0].message}
                </p>
              ) : (
                Object.values(item[1]).map((subItem, subIndex) => (
                  <div
                    onClick={() => {
                      handleSessionNavigation(index);
                      setCurrentSession(Object.keys(item[1])[subIndex]);
                      addSubSession(subItem.title);
                    }}
                    key={`${subItem.title} -${subIndex}`}
                    className='ml-1 w-full rounded-xl p-2 hover:bg-primary-50 '
                  >
                    <h1 className='small-semibold'>{subItem.title}</h1>
                    <p className='subtle-medium line-clamp-1 text-shadow'>
                      {subItem.message[0].message}
                    </p>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default memo(ChatHistory);
