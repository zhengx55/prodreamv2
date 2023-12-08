'use client';
import { FormEvent, useEffect, useState } from 'react';
import EditBar from './EditBar';
import { Variants, motion } from 'framer-motion';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import SuggestionPanel from './SuggestionPanel';
import EditiorLoading from './EditiorLoading';
import useDeepCompareEffect from 'use-deep-compare-effect';

export const EssayVariants: Variants = {
  half: {
    width: '50%',
  },
  full: {
    width: '66.666667%',
  },
};

const EssayPanel = () => {
  const [wordCount, setWordCount] = useState(0);
  const { essayRef, isPolishing, polishResult } = useAiEditiorContext();
  console.log(
    '🚀 ~ file: EssayPanel.tsx:21 ~ EssayPanel ~ polishResult:',
    polishResult
  );
  const hasPolishResult = polishResult.length > 0;

  useDeepCompareEffect(() => {
    if (polishResult.length > 0 && essayRef.current) {
      console.log(essayRef.current.innerHTML);
    }
  }, [polishResult]);

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
    <>
      <div className='flex h-full w-full justify-center gap-x-8 overflow-hidden p-4'>
        <motion.div
          initial={false}
          variants={EssayVariants}
          animate={hasPolishResult || isPolishing ? 'half' : 'full'}
          className='flex h-full flex-col'
        >
          <EditBar />
          <div
            className={`relative flex h-[calc(100%_-50px)] w-full flex-col rounded-lg py-6`}
          >
            <div
              ref={essayRef}
              onInput={handleInput}
              className='h-full w-full overflow-y-auto whitespace-pre-wrap leading-relaxed outline-none'
              placeholder='Write your message..'
              contentEditable={!hasPolishResult && !isPolishing}
              spellCheck={false}
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
          </div>
        </motion.div>
        {isPolishing ? (
          <EditiorLoading />
        ) : hasPolishResult ? (
          <SuggestionPanel />
        ) : null}
      </div>
    </>
  );
};

export default EssayPanel;
