'use client';
import { FormEvent, useEffect, useState } from 'react';
import EditBar from './EditBar';
import { Variants, motion } from 'framer-motion';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import EditiorLoading from './EditiorLoading';
import useDeepCompareEffect from 'use-deep-compare-effect';
import dynamic from 'next/dynamic';
import useGlobalEvent from 'beautiful-react-hooks/useGlobalEvent';

const SuggestionPanel = dynamic(() => import('./SuggestionPanel'), {
  ssr: false,
  loading: () => <EditiorLoading />,
});

const ChatEditPanel = dynamic(() => import('./ChatEditPanel'), {
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
  const {
    essayRef,
    isPolishing,
    polishResult,
    setSelectText,
    chatEditMode,
    polishResultB,
  } = useAiEditiorContext();
  const hasPolishResult = polishResult.length > 0 || polishResultB !== '';
  const isMultScreen = hasPolishResult || isPolishing || chatEditMode;

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
        item.data.map((sentence, sentence_idx) => {
          if ([2, 3].includes(sentence.status)) {
            const sentenceHtml = `&nbsp;<span id="suggest-${index}-${sentence_idx}" class="suggest-change">${sentence.sub_str} </span>`;
            finalText += sentenceHtml;
          } else {
            const sentenceHtml = `${sentence.sub_str}`;
            finalText += sentenceHtml;
          }
        });
        lineBreakPositions.forEach((break_point, _point_idx) => {
          if (Math.abs(item.end - break_point) <= 5) {
            finalText += `<br/>`;
          }
        });
      });
      finalText += '</article>';
      essayRef.current.innerHTML = finalText;
    }
  }, [polishResult]);

  useEffect(() => {
    if (chatEditMode) {
      if (essayRef.current) {
        essayRef.current.innerHTML = essayRef.current.innerText;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatEditMode]);

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

  const onSelectionChange = useGlobalEvent('mouseup');

  onSelectionChange(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      // 处理选中文本
      if (selection.anchorNode?.parentElement?.ariaLabel !== 'essay-editor') {
        return;
      }
      // const { startOffset, endOffset } = selection.getRangeAt(0);
      // console.log(
      //   '🚀 ~ file: EssayPanel.tsx:103 ~ onSelectionChange ~ startOffset:',
      //   startOffset
      // );

      // if (endOffset - startOffset === 0) {
      //   setSelectedRange(null);
      // } else {
      //   setSelectedRange([startOffset, endOffset]);
      // }
      setSelectText(selection.getRangeAt(0).toString());
    }
  });

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === 'Enter') {
      // 阻止回车键的默认行为
      event.preventDefault();
      const selection_text = window.getSelection();
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
            aria-label='editor-parent'
            className={`relative flex h-[calc(100%_-50px)] w-full flex-col rounded-lg py-6`}
          >
            <div
              aria-label='essay-editor'
              ref={essayRef}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              className='h-full w-full overflow-y-auto whitespace-pre-line text-[16px] leading-loose outline-none'
              placeholder='Write your message..'
              suppressContentEditableWarning
              contentEditable={!isPolishing ? 'plaintext-only' : false}
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
        {chatEditMode && <ChatEditPanel />}
        {isPolishing && !chatEditMode ? (
          <EditiorLoading />
        ) : hasPolishResult && !chatEditMode ? (
          <SuggestionPanel />
        ) : null}
      </div>
    </>
  );
};

export default EssayPanel;
