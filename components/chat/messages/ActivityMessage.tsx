'use client';
import React, { memo, useState } from 'react';
import ChatIconOption from '../ChatIconOption';
import { messageOptions } from '@/constant';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

type Props = {};

const ActivityMessage = (props: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const ListVariant: Variants = {
    open: { height: '500px' },
    closed: { height: '122px' },
  };
  return (
    <motion.div
      initial={false}
      animate={showOptions ? 'open' : 'closed'}
      variants={ListVariant}
      className='flex w-[80%] min-w-[485px] flex-col self-start rounded-xl bg-shadow-200 p-4'
    >
      <p className='small-regular text-black-700'>
        Great! You can click Add Activity to add a new experience
      </p>
      <div className='flex-start mt-2'>
        <Button
          variant={'bold'}
          size={'sm'}
          onClick={() => {
            setShowOptions((prev) => !prev);
          }}
        >
          {showOptions ? 'Hide' : 'Show'} Activity
        </Button>
      </div>
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='mt-4 flex flex-wrap gap-4'
          >
            {messageOptions.map((item) => (
              <ChatIconOption
                theme={item.theme}
                title={item.title}
                icon={item.icon}
                key={item.id}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ActivityMessageCSR = dynamic(() => Promise.resolve(ActivityMessage), {
  ssr: false,
});
export default memo(ActivityMessageCSR);
