'use client';
import { FormEvent, useState } from 'react';
import EditBar from './EditBar';
import { Variants, motion } from 'framer-motion';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import EditiorLoading from './EditiorLoading';
import useDeepCompareEffect from 'use-deep-compare-effect';
import dynamic from 'next/dynamic';

const SuggestionPanel = dynamic(() => import('./SuggestionPanel'), {
  ssr: false,
  loading: () => <EditiorLoading />,
});

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
  const hasPolishResult = polishResult.length > 0;
  const isMultScreen = hasPolishResult || isPolishing;
  useDeepCompareEffect(() => {
    if (polishResult.length > 0 && essayRef.current) {
      // 查询原文当中所有的换行符位置
      const lineBreakPositions: number[] = [];
      const regex = /\n/g;
      let match;
      while ((match = regex.exec(essayRef.current.innerText)) !== null) {
        lineBreakPositions.push(match.index);
      }
      // 查询起始索引和终止索引
      let finalText = '<article class="suggest-artice">';
      polishResult.map((item, index) => {
        if (!essayRef.current) {
          return;
        }
        item.original_sentence.map((sentence, sentence_idx) => {
          if (sentence.is_identical) {
            const sentenceHtml = `${sentence.sub_str}`;
            finalText += sentenceHtml;
          } else {
            const sentenceHtml = `<span id="suggest-${index}-${sentence_idx}" class="suggest-change"> ${sentence.sub_str} </span>`;
            finalText += sentenceHtml;
          }
        });
        lineBreakPositions.forEach((_, point_idx) => {
          if (Math.abs(item.end - lineBreakPositions[point_idx]) <= 2) {
            finalText += `<br/>`;
          }
        });
      });
      finalText += '</article>';
      essayRef.current.innerHTML = finalText;
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
          animate={isMultScreen ? 'half' : 'full'}
          className='flex h-full flex-col'
        >
          <EditBar />
          <div
            className={`relative flex h-[calc(100%_-50px)] w-full flex-col rounded-lg py-6`}
          >
            <div
              ref={essayRef}
              onInput={handleInput}
              className='h-full w-full overflow-y-auto whitespace-pre-line break-words leading-relaxed outline-none'
              placeholder='Write your message..'
              contentEditable={
                !hasPolishResult && !isPolishing ? 'plaintext-only' : false
              }
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
