import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import React, { useState } from 'react';
import Spacer from '../root/Spacer';
import { IPolishQueryResult } from '@/query/type';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Button } from '../ui/button';

const SuggestionPanel = () => {
  const { polishResult } = useAiEditiorContext();

  const [suggestions, setSuggestions] = useState<IPolishQueryResult[]>(() => {
    if (polishResult.length === 0) {
      return [];
    } else {
      return polishResult.map((item) => ({ ...item, expand: false }));
    }
  });

  const toogleExpand = (index: number) => {
    setSuggestions((prev) => {
      return prev.map((item, i) =>
        i === index ? { ...item, expand: !item.expand } : item
      );
    });
  };

  const remove = (index: number) => {
    setSuggestions((prev) => {
      return prev.filter((_item, idx) => idx !== index);
    });
  };

  return (
    <div className='flex min-h-full w-1/2 flex-col overflow-y-auto'>
      <div aria-label='all suggestions' className='flex items-center gap-x-2'>
        <span className='small-semibold flex-center h-8 w-8 rounded-full border-shadow-border bg-primary-50 '>
          {suggestions.length}
        </span>
        <h2 className='base-semibold'>All Suggestions</h2>
      </div>
      <Spacer y='24' />
      <AnimatePresence>
        {' '}
        {suggestions.map((item, index) => {
          // 过滤没有更新的句子
          const isExpanded = item.expand;
          const hasNew = item.new_sentence.find(
            (el) => el.is_identical === false
          );
          if (!hasNew) return null;
          return (
            <motion.div
              onClick={() => {
                toogleExpand(index);
              }}
              layout='size'
              style={{ height: isExpanded ? 'auto' : '48px' }}
              // initial={false}
              // animate={isExpanded ? { height: 'auto' } : { height: '48px' }}
              className='mt-4 w-full shrink-0 cursor-pointer rounded-lg border border-shadow-border px-4 py-3 hover:shadow-xl'
              key={`polish-${index}`}
            >
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`leading-relaxed ${!isExpanded && 'line-clamp-1'}`}
                >
                  {item.new_sentence.map((sentence, idx) => {
                    const isNew = sentence.is_identical;
                    return (
                      <span
                        key={`sentence-${index}-${idx}`}
                        className={`${
                          sentence.is_identical
                            ? 'text-black-100'
                            : 'text-primary-200'
                        }`}
                      >
                        {!isNew && item.original_sentence[idx] && (
                          <>
                            <span className='text-red-500 line-through'>
                              {item.original_sentence[idx].sub_str}
                            </span>
                            &nbsp;
                          </>
                        )}
                        {sentence.sub_str}&nbsp;
                      </span>
                    );
                  })}
                </motion.p>
              )}

              {!isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`leading-relaxed ${!isExpanded && 'line-clamp-1'}`}
                >
                  {item.new_sentence.map((sentence, idx) => {
                    const isNew = sentence.is_identical;
                    return (
                      <span
                        key={`sentence-${index}-${idx}`}
                        className={`${
                          sentence.is_identical
                            ? 'text-black-100'
                            : 'text-primary-200'
                        }`}
                      >
                        {!isNew && item.original_sentence[idx] && (
                          <>
                            <span className='text-red-500 line-through'>
                              {item.original_sentence[idx].sub_str}
                            </span>
                            &nbsp;
                          </>
                        )}
                        {sentence.sub_str}&nbsp;
                      </span>
                    );
                  })}
                </motion.p>
              )}

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className='mt-4 flex gap-x-2 animate-in'
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(1);
                    }}
                    className='font-semibold'
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    variant={'ghost'}
                    className='font-semibold text-shadow'
                  >
                    Dismiss
                  </Button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SuggestionPanel;
