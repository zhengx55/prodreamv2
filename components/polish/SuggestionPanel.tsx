import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import React, { Fragment, useState } from 'react';
import Spacer from '../root/Spacer';
import { IPolishResultAData } from '@/query/type';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/button';
import { useAIEditiorHistoryContext } from '@/context/AIEditiorHistoryProvider';

const SuggestionPanel = () => {
  const {
    essayRef,
    polishResult,
    setPolishResult,
    polishResultB,
    setPolishResultB,
  } = useAiEditiorContext();

  const { storeIntoHistory } = useAIEditiorHistoryContext();

  const [suggestions, setSuggestions] = useState<IPolishResultAData[]>(() => {
    if (polishResult.length === 0) {
      return [];
    } else {
      return polishResult.map((item, idx) =>
        idx === 0
          ? {
              ...item,
              expand: true,
              hide: false,
            }
          : {
              ...item,
              expand: false,
              hide: false,
            }
      );
    }
  });

  const expand = (index: number) => {
    setSuggestions((prev) => {
      return prev.map((item, i) =>
        i === index ? { ...item, expand: true } : { ...item, expand: false }
      );
    });
  };

  const close = (index: number) => {
    setSuggestions((prev) => {
      return prev.map((item, i) =>
        i === index ? { ...item, expand: false } : item
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
    if (!essayRef.current) return;
    const essay_html = essayRef.current.innerHTML;
    item.data.map((sentence, sentence_idx) => {
      if (!essayRef.current) return;
      if (sentence.status === 0) {
        return;
      }
      const originalElement = document.getElementById(
        `suggest-${index}-${sentence_idx}`
      );
      if (originalElement) {
        if (sentence.status === 2) {
          const parent = originalElement.parentNode;
          parent?.removeChild(originalElement);
        } else if (sentence.status === 3) {
          originalElement.innerText = ` ${sentence.new_str} `;
          originalElement.classList.remove('suggest-change');
        } else if (sentence.status === 1) {
          originalElement.innerText = ` ${sentence.new_str} `;
          originalElement.classList.remove('suggest-change');
        }
      }
    });
    storeIntoHistory(essay_html);
    remove(index);
  };

  const handleAcceptAll = () => {
    suggestions.forEach((suggestion, suggestion_idx) => {
      replaceText(suggestion_idx, suggestion);
    });
    setPolishResult([]);
  };

  const handleRejectAll = () => {
    // clear all suggestions
    setSuggestions([]);
    // clear all underline styling
    if (!essayRef.current) return;
    if (polishResult) setPolishResult([]);
    essayRef.current.innerHTML = essayRef.current.innerText;
    // turn off suggestions panel
  };

  return (
    <div className='flex min-h-full w-1/2 flex-col overflow-y-auto'>
      <div aria-label='all suggestions' className='flex-between'>
        <div className='flex items-center gap-x-2'>
          <span className='small-semibold flex-center h-8 w-8 rounded-full border-shadow-border bg-primary-50 '>
            {polishResultB ? 1 : suggestions.length}
          </span>
          <h2 className='base-semibold'>All Suggestions</h2>
        </div>
        {polishResultB ? null : (
          <div className='flex items-center'>
            <Button
              onClick={handleAcceptAll}
              variant={'secondary'}
              className='border-none'
            >
              Accept all
            </Button>
            <Button
              onClick={handleRejectAll}
              variant={'ghost'}
              className='text-shadow'
            >
              Reject all
            </Button>
          </div>
        )}
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
                onClick={() => (isExpanded ? close(index) : expand(index))}
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
