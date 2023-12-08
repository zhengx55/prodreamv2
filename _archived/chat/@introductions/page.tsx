'use client';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { ChatIntroductionCard, moduleInfo, moduleMenu } from '@/constant';
import { useChatNavigatorContext } from '@/_archived/ChatNavigationProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Page() {
  const { updateCurrentRoute } = useChatNavigatorContext();
  const [module, setModule] = useState(0);
  return (
    <motion.main
      key={'introduction'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto py-10 md:px-10'
    >
      <div className='flex w-full flex-col items-start '>
        <div className='flex-between w-full'>
          <BackButton onBack={() => updateCurrentRoute('informations')} />
          <Button
            onClick={() => updateCurrentRoute('chatPanel')}
            size={'expand'}
            className='mt-10 self-end'
          >
            Next
          </Button>
        </div>
        <h1 className='h3-bold capitalize'>Introduction</h1>
        <h2 className='title-semibold mt-10'>
          Unleash your potential with us!
        </h2>
        <div className='mt-5 flex items-center gap-x-5'>
          {ChatIntroductionCard.map((item) => (
            <div
              key={item.id}
              className='flex h-[140px] w-[33%] flex-col gap-y-2 rounded-lg border border-shadow-border px-6 py-4 shadow-card'
            >
              <h3 className='base-medium text-black-500'>{item.title}</h3>
              <p className='small-regular text-shadow-300'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <h2 className='title-semibold mt-12'>What does this module cover?</h2>
        <div className='mt-3 flex h-[450px] '>
          <div className='flex w-[20%] flex-col'>
            {moduleMenu.map((item, index) => (
              <div
                onClick={() => setModule(index)}
                className={`flex ${
                  module === index ? 'bg-primary-50 text-primary-200' : ''
                } h-[52px] w-full cursor-pointer items-center rounded-bl-xl rounded-tl-xl px-4 hover:bg-primary-50 hover:text-primary-200`}
                key={item.id}
              >
                {item.title}
              </div>
            ))}
          </div>
          <AnimatePresence mode='wait'>
            <motion.div
              key={module}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='grid w-[80%] grid-cols-1'
            >
              {moduleInfo[module].value.map((item, index) => (
                <div
                  key={item.id}
                  className='flex gap-x-16 border border-shadow-border p-6 first:rounded-tl-lg first:rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg'
                >
                  <h1 className='h3-semibold'>{index}</h1>
                  <p className='small-regular leading-6 text-shadow-300'>
                    <span className='font-[600] text-black-200'>
                      {item.title}:{' '}
                    </span>
                    {item.info}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
