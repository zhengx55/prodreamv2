'use client';
import { ChatSteps } from '@/constant/enum';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useChatMessageContext } from '@/context/ChatMessageContext';

const ChatHistory = () => {
  const { setCurrentSteps, currentSteps } = useChatMessageContext();
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
        <div
          className={`${
            currentSteps === 1 ? 'bg-primary-50' : ''
          } flex cursor-pointer flex-col gap-y-2 rounded-xl p-2 hover:bg-primary-50`}
          onClick={() => {
            setCurrentSteps(1);
          }}
        >
          <h1 className='base-semibold'>
            Step {currentSteps}:&nbsp;
            {ChatSteps.MOVTIVATION}
          </h1>
          <p className='subtle-medium text-shadow'>
            Text to speech voice: Introducing...
          </p>
        </div>
        <div
          className={`${
            currentSteps === 2 ? 'bg-primary-50' : ''
          } flex cursor-pointer flex-col gap-y-2 rounded-xl p-2 hover:bg-primary-50`}
          onClick={() => {
            setCurrentSteps(2);
          }}
        >
          <h1 className='base-semibold'>
            Step {currentSteps}:&nbsp;
            {ChatSteps.EDUCATION}
          </h1>
          <p className='subtle-medium text-shadow'>
            Text to speech voice: Introducing...
          </p>
        </div>
        <div
          className={`${
            currentSteps === 3 ? 'bg-primary-50' : ''
          } flex cursor-pointer flex-col gap-y-2 rounded-xl p-2 hover:bg-primary-50`}
          onClick={() => {
            setCurrentSteps(3);
          }}
        >
          <h1 className='base-semibold'>
            Step {currentSteps}:&nbsp;
            {ChatSteps.PREVIOUS}
          </h1>
          <p className='subtle-medium text-shadow'>
            Text to speech voice: Introducing...
          </p>
        </div>
        <div
          className={`${
            currentSteps === 4 ? 'bg-primary-50' : ''
          } flex cursor-pointer flex-col gap-y-2 rounded-xl p-2 hover:bg-primary-50`}
          onClick={() => {
            setCurrentSteps(4);
          }}
        >
          <h1 className='base-semibold'>
            Step {currentSteps}:&nbsp;
            {ChatSteps.PLANNING}
          </h1>
          <p className='subtle-medium text-shadow'>
            Text to speech voice: Introducing...
          </p>
        </div>
        <div
          className={`${
            currentSteps === 5 ? 'bg-primary-50' : ''
          } flex cursor-pointer flex-col gap-y-2 rounded-xl p-2 hover:bg-primary-50`}
          onClick={() => {
            setCurrentSteps(5);
          }}
        >
          <h1 className='base-semibold'>
            Step {currentSteps}:&nbsp;
            {ChatSteps.REASON}
          </h1>
          <p className='subtle-medium text-shadow'>
            Text to speech voice: Introducing...
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ChatHistory);
