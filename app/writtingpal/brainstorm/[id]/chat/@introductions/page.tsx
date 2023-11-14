'use client';
import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';
import { ChatIntroductionCard, moduleInfo, moduleMenu } from '@/constant';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
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
      className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto px-10 pt-20 md:px-0'
    >
      <BackButton onBack={() => updateCurrentRoute('informations')} />
      <div className='flex flex-col items-start '>
        <h1 className='primary-title capitalize'>Introduction</h1>
        <h2 className='h3-semibold mt-12'>Unleash your potential with us!</h2>
        <div className='mt-5 flex items-center gap-x-5'>
          {ChatIntroductionCard.map((item) => (
            <div
              key={item.id}
              className='flex h-[240px] w-[340px] flex-col gap-y-8 rounded-lg border border-shadow-border p-6 shadow-card'
            >
              <h3 className='body-medium text-black-500'>{item.title}</h3>
              <p className='small-regular leading-7 text-shadow-300'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <h2 className='h3-semibold mt-12'>What does this module cover?</h2>
        <div className='mt-5 flex h-[450px] '>
          <div className='flex w-[240px] flex-col'>
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
              className='grid w-[820px] grid-cols-1'
            >
              {moduleInfo[module].value.map((item, index) => (
                <div
                  key={item.id}
                  className='flex gap-x-16 border border-shadow-border p-6'
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
        <Button
          onClick={() => updateCurrentRoute('chatPanel')}
          size={'expand'}
          className='mt-10 self-end'
        >
          Next
        </Button>
      </div>
    </motion.main>
  );
}
