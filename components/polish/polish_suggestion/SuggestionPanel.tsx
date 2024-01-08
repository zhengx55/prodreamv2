import { getDiffSentencesPair, getSubStrPos } from '@/lib/utils';
import { IPolishResultAData } from '@/query/type';
import useAIEditorStore from '@/zustand/store';
import escapeStringRegExp from 'escape-string-regexp';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Button } from '../../ui/button';
import SentenceFragment from './SentenceFragment';

const SuggestionPanel = () => {
  const polishResult = useAIEditorStore((state) => state.polishResult);
  const polishResultB = useAIEditorStore(
    (state) => state.polishResultWholeParagraph
  );
  const editor_instance = useAIEditorStore((state) => state.editor_instance);
  const clearPolishResult = useAIEditorStore(
    (state) => state.clearPolishResult
  );
  const [suggestions, setSuggestions] = useState<IPolishResultAData[]>([]);

  useDeepCompareEffect(() => {
    if (polishResult.length > 0) {
      setSuggestions(
        polishResult.map((item, idx) => {
          if (idx === 0) {
            const current_suggestion = polishResult.at(0);
            if (current_suggestion) {
              const corrsponding_segement = editor_instance
                ?.getText()
                .substring(current_suggestion.start, current_suggestion.end);
              hightLightSentence(current_suggestion, corrsponding_segement!);
            }
            return {
              ...item,
              expand: true,
              hide: false,
            };
          } else {
            return {
              ...item,
              expand: false,
              hide: false,
            };
          }
        })
      );
    }
  }, [polishResult]);

  const highLightAtPosition = (from: number, to: number) => {
    if (!editor_instance) return;
    editor_instance
      .chain()
      .setTextSelection({
        from,
        to,
      })
      .setHighlight({ color: 'rgba(236, 120, 113, 0.2)' })
      .run();
  };

  const clearAllHightLight = () => {
    if (!editor_instance) return null;
    editor_instance.chain().selectAll().unsetHighlight().run();
  };

  const hightLightSentence = (
    current_suggestion: IPolishResultAData,
    corrsponding_segement: string
  ) => {
    if (!editor_instance) return;
    let start_position = editor_instance
      .getText()
      .indexOf(corrsponding_segement.trim());
    if ([1, 2, 3].includes(current_suggestion.data.at(0)!.status)) {
      start_position -= 1;
    }
    current_suggestion.data.forEach((suggestion) => {
      if ([2, 3].includes(suggestion.status)) {
        let substring_regex: RegExp;
        if (/[^\w\s]+/g.test(suggestion.sub_str)) {
          substring_regex = new RegExp(
            escapeStringRegExp(suggestion.sub_str),
            'g'
          );
        } else {
          substring_regex = new RegExp(`\\b${suggestion.sub_str}\\b`, 'g');
        }
        const position = corrsponding_segement!.search(substring_regex);
        if (position === -1) return;
        highLightAtPosition(
          position + start_position + 1,
          position + start_position + suggestion.sub_str.length + 1
        );
      }
    });
  };

  const expand = (index: number) => {
    // hight light changed fragments on the essay
    if (!editor_instance) return;
    clearAllHightLight();
    const current_suggestion = suggestions.at(index);
    if (current_suggestion) {
      const corrsponding_segement = getSubStrPos(current_suggestion);
      hightLightSentence(current_suggestion, corrsponding_segement);
    }
    setSuggestions((prev) => {
      return prev.map((item, i) =>
        i === index ? { ...item, expand: true } : { ...item, expand: false }
      );
    });
  };

  const close = (index: number) => {
    clearAllHightLight();
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

  /**
   * 切换editor中对应的文字内容
   * @param index
   * @param item
   */
  const replaceText = (index: number, item: IPolishResultAData) => {
    if (!editor_instance) return;
    const { original_string, relpace_string } = getDiffSentencesPair(item);
    // 查找文字内容 删除旧内容 并插入新内容
    const original_range = editor_instance
      .getText()
      .indexOf(original_string.trim());

    if (original_range === -1) {
      remove(index);
      return;
    }
    const from = original_range + 1;
    const to = original_range + original_string.trim().length + 1;
    editor_instance
      .chain()
      .setTextSelection({ from, to })
      .unsetHighlight()
      .unsetUnderline()
      .run();
    editor_instance
      .chain()
      .deleteRange({
        from,
        to,
      })
      .insertContentAt(from, `${relpace_string}`, {
        parseOptions: { preserveWhitespace: 'full' },
      })
      .run();
    remove(index);
  };

  const handleAcceptAll = () => {
    clearAllHightLight();
    suggestions.forEach((suggestion, suggestion_idx) => {
      replaceText(suggestion_idx, suggestion);
    });
    clearPolishResult();
  };

  const handleRejectAll = () => {
    clearAllHightLight();
    setSuggestions([]);
    if (!editor_instance) return;
    editor_instance.chain().selectAll().unsetPolishUnderline().run();
    if (polishResult) clearPolishResult();
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
      {polishResultB ? (
        <div className='mt-4 w-full shrink-0 cursor-pointer rounded-lg border border-shadow-border px-4 py-3 hover:shadow-xl'>
          <p className={`whitespace-pre-line leading-relaxed`}>
            {polishResultB}
          </p>
          <div className='mt-4 flex gap-x-2'>
            <Button
              onClick={() => {
                if (!editor_instance) return;
                editor_instance.commands.setContent(polishResultB, false, {
                  preserveWhitespace: 'full',
                });
                clearPolishResult();
              }}
              className='font-semibold'
            >
              Accept
            </Button>
            <Button
              onClick={clearPolishResult}
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
                  <>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='break-words leading-relaxed text-black-400'
                    >
                      {item.data.map((sentence, idx) => {
                        const isAdd = sentence.status === 1;
                        const isDelete = sentence.status === 2;
                        const isModify = sentence.status === 3;
                        const isNoChange = sentence.status === 0;
                        return (
                          <SentenceFragment
                            isNoChange={isNoChange}
                            isDelete={isDelete}
                            isModify={isModify}
                            isAdd={isAdd}
                            sentence={sentence}
                            key={`sentence-${index}-${idx}`}
                          />
                        );
                      })}
                    </motion.p>
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
                  </>
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
                        <SentenceFragment
                          isNoChange={isNoChange}
                          isDelete={isDelete}
                          isModify={isModify}
                          isAdd={isAdd}
                          sentence={sentence}
                          key={`sentence-${index}-${idx}`}
                        />
                      );
                    })}
                  </motion.p>
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
