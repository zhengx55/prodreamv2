import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import React, { useState } from 'react';
import Spacer from '../root/Spacer';
import { IPolishResultAData } from '@/query/type';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';

const SuggestionPanel = () => {
  const { polishResult, essayRef } = useAiEditiorContext();

  const [suggestions, setSuggestions] = useState<IPolishResultAData[]>(() => {
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

  const replaceText = (index: number, item: IPolishResultAData) => {
    if (!essayRef.current) {
      return;
    }
    console.log(item);
    // item.new_sentence.forEach((sentence, sentence_idx) => {
    //   if (sentence.is_identical) {
    //     return;
    //   }
    //   const originalElement = document.getElementById(
    //     `suggest-${index}-${sentence_idx}`
    //   );
    //   if (originalElement) {
    //     originalElement.innerText = ` ${sentence.sub_str} `;
    //     originalElement.classList.remove('suggest-change');
    //     remove(index);
    //   }
    // });
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
        {suggestions.map((item, index) => {
          // 过滤没有更新的句子
          const isExpanded = item.expand;
          return (
            <motion.div
              onClick={() => {
                toogleExpand(index);
              }}
              layout='size'
              style={{ height: isExpanded ? 'auto' : '48px' }}
              className='mt-4 w-full shrink-0 cursor-pointer rounded-lg border border-shadow-border px-4 py-3 hover:shadow-xl'
              key={`polish-${index}`}
            >
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`break-words leading-relaxed ${
                    !isExpanded && 'line-clamp-1'
                  }`}
                >
                  {item.data.map((sentence, idx) => {
                    const isAdd = sentence.status === 1;
                    const isDelete = sentence.status === 2;
                    const isModify = sentence.status === 3;
                    const isNoChange = sentence.status === 0;
                    return (
                      <span
                        className='base-regular'
                        key={`sentence-${index}-${idx}`}
                      >
                        {isNoChange ? (
                          <span className='text-black-400'>
                            &nbsp;{sentence.sub_str}&nbsp;
                          </span>
                        ) : isAdd ? (
                          <>
                            <span className='text-primary-200'>
                              &nbsp;{sentence.new_str}&nbsp;
                            </span>
                            {sentence.sub_str && (
                              <span className='text-black-400'>
                                &nbsp;{sentence.sub_str}&nbsp;
                              </span>
                            )}
                          </>
                        ) : isDelete ? (
                          <>
                            &nbsp;
                            <span className='text-red-500 line-through'>
                              {sentence.sub_str}
                            </span>
                            &nbsp;
                          </>
                        ) : isModify ? (
                          <>
                            &nbsp;
                            <span className='text-red-500 line-through'>
                              {sentence.sub_str}
                            </span>
                            &nbsp;
                            <span className='text-primary-200'>
                              &nbsp;{sentence.new_str}&nbsp;
                            </span>
                          </>
                        ) : null}
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
                  className={`break-words leading-relaxed ${
                    !isExpanded && 'line-clamp-1'
                  }`}
                >
                  {item.data.map((sentence, idx) => {
                    const isAdd = sentence.status === 1;
                    const isDelete = sentence.status === 2;
                    const isModify = sentence.status === 3;
                    const isNoChange = sentence.status === 0;
                    return (
                      <span
                        className='base-regular'
                        key={`sentence-${index}-${idx}`}
                      >
                        {isNoChange ? (
                          <span className='text-black-400'>
                            &nbsp;{sentence.sub_str}&nbsp;
                          </span>
                        ) : isAdd ? (
                          <>
                            <span className='text-primary-200'>
                              &nbsp;{sentence.new_str}&nbsp;
                            </span>
                            {sentence.sub_str && (
                              <span className='text-black-400'>
                                &nbsp;{sentence.sub_str}&nbsp;
                              </span>
                            )}
                          </>
                        ) : isDelete ? (
                          <>
                            &nbsp;
                            <span className='text-red-500 line-through'>
                              {sentence.sub_str}
                            </span>
                            &nbsp;
                          </>
                        ) : isModify ? (
                          <>
                            &nbsp;
                            <span className='text-red-500 line-through'>
                              {sentence.sub_str}
                            </span>
                            &nbsp;
                            <span className='text-primary-200'>
                              &nbsp;{sentence.new_str}&nbsp;
                            </span>
                          </>
                        ) : null}
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
                      replaceText(index, item);
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
