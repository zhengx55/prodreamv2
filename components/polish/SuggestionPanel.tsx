import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import React, { Fragment, useState } from 'react';
import Spacer from '../root/Spacer';
import { IPolishResultAData } from '@/query/type';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';

const SuggestionPanel = () => {
  const { essayRef, polishResult, polishResultB, setPolishResultB } =
    useAiEditiorContext();

  const [suggestions, setSuggestions] = useState<IPolishResultAData[]>(() => {
    if (polishResult.length === 0) {
      return [];
    } else {
      return polishResult.map((item) => ({
        ...item,
        expand: false,
        hide: false,
      }));
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
      return prev.map((item, i) =>
        i === index ? { ...item, hide: true } : item
      );
    });
  };

  const replaceText = (index: number, item: IPolishResultAData) => {
    item.data.map((sentence, sentence_idx) => {
      if (sentence.status === 0) {
        return;
      }
      const originalElement = document.getElementById(
        `suggest-${index}-${sentence_idx}`
      );
      if (originalElement) {
        if (sentence.status === 2) {
          originalElement.innerText = ' ';
          originalElement.classList.remove('suggest-change');
        } else if ([1, 3].includes(sentence.status)) {
          originalElement.innerText = ` ${sentence.new_str} `;
          originalElement.classList.remove('suggest-change');
        }
      }
    });
    remove(index);
  };

  return (
    <div className='flex min-h-full w-1/2 flex-col overflow-y-auto'>
      <div aria-label='all suggestions' className='flex items-center gap-x-2'>
        <span className='small-semibold flex-center h-8 w-8 rounded-full border-shadow-border bg-primary-50 '>
          {polishResultB ? 1 : suggestions.length}
        </span>
        <h2 className='base-semibold'>All Suggestions</h2>
      </div>
      <Spacer y='24' />
      {polishResultB ? (
        <div className='mt-4 w-full shrink-0 cursor-pointer rounded-lg border border-shadow-border px-4 py-3 hover:shadow-xl'>
          <p className={`whitespace-pre-line leading-relaxed`}>
            {polishResultB}
          </p>
          <div className='mt-4 flex gap-x-2'>
            <Button
              onClick={() => {
                if (!essayRef.current) return;
                essayRef.current.innerText = polishResultB;
                setPolishResultB('');
              }}
              className='font-semibold'
            >
              Accept
            </Button>
            <Button
              onClick={() => {
                setPolishResultB('');
              }}
              variant={'ghost'}
              className='font-semibold text-shadow'
            >
              Dismiss
            </Button>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          {suggestions.map((item, index) => {
            // 过滤没有更新的句子
            const isExpanded = item.expand;
            const isHide = item.hide;
            if (isHide) return null;
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
                    className={`leading-relaxed`}
                  >
                    {item.data.map((sentence, idx) => {
                      const isAdd = sentence.status === 1;
                      const isDelete = sentence.status === 2;
                      const isModify = sentence.status === 3;
                      const isNoChange = sentence.status === 0;
                      return (
                        <Fragment key={`sentence-${index}-${idx}`}>
                          {isNoChange ? (
                            <span className='text-black-400'>
                              {sentence.sub_str}
                            </span>
                          ) : isAdd ? (
                            <>
                              &nbsp;
                              <span className='text-primary-200'>
                                {sentence.new_str}
                              </span>
                              {sentence.sub_str && (
                                <span className='text-black-400'>
                                  {sentence.sub_str}
                                </span>
                              )}
                              &nbsp;
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
                                {sentence.new_str}
                              </span>
                              &nbsp;
                            </>
                          ) : null}
                        </Fragment>
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
                    className={`line-clamp-1 leading-relaxed`}
                  >
                    {item.data.map((sentence, idx) => {
                      const isAdd = sentence.status === 1;
                      const isDelete = sentence.status === 2;
                      const isModify = sentence.status === 3;
                      const isNoChange = sentence.status === 0;
                      return (
                        <Fragment key={`sentence-${index}-${idx}`}>
                          {isNoChange ? (
                            <span className='text-black-400'>
                              {sentence.sub_str}
                            </span>
                          ) : isAdd ? (
                            <>
                              &nbsp;
                              <span className='text-primary-200'>
                                {sentence.new_str}
                              </span>
                              {sentence.sub_str && (
                                <span className='text-black-400'>
                                  {sentence.sub_str}
                                </span>
                              )}
                              &nbsp;
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
                                {sentence.new_str}
                              </span>
                              &nbsp;
                            </>
                          ) : null}
                        </Fragment>
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
                    className='mt-4 flex gap-x-2'
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
      )}
    </div>
  );
};

export default SuggestionPanel;
