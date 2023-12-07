'use client';
import { FormEvent, useState } from 'react';
import EditBar from './EditBar';
import { Variants, motion } from 'framer-motion';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';

export const EssayVariants: Variants = {
  half: {
    width: '50%',
    alignSelf: 'flex-start',
  },
  full: {
    width: '66.666667%',
    alignSelf: 'center',
  },
};

const EssayPanel = () => {
  const [mutiScreen, setmutiScreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const { essayRef, taskId } = useAiEditiorContext();
  const handleInput = (e: FormEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent;
    if (text) {
      const words = text
        .replace(/[^a-zA-Z\s]/g, '')
        .split(/\s+/)
        .filter((word) => word !== '');
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  };
  return (
    <div className='flex w-full flex-col overflow-hidden py-4'>
      <EditBar mutiScreen={mutiScreen} />
      <motion.div
        initial={false}
        variants={EssayVariants}
        animate={mutiScreen ? 'half' : 'full'}
        className={`relative flex h-[calc(100%_-50px)] flex-col rounded-lg py-6`}
      >
        <div
          ref={essayRef}
          onInput={handleInput}
          className='h-full w-full overflow-y-auto text-justify outline-none'
          placeholder='Write your message..'
          contentEditable
        />
        <div className='flex-between absolute -bottom-6 left-0 flex h-12 w-full'>
          <div className='flex items-center gap-x-2'>
            <div className='tooltip'>
              <p className='small-semibold'>
                {wordCount}
                &nbsp;Words
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EssayPanel;
