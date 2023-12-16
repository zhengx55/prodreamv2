'use client';
import { useEffect, useState } from 'react';
import EditBar from './EditBar';
import { motion } from 'framer-motion';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import EditiorLoading from './EditiorLoading';
import dynamic from 'next/dynamic';
import useGlobalEvent from 'beautiful-react-hooks/useGlobalEvent';
import { useAppSelector } from '@/store/storehooks';
import { selectEssay } from '@/store/reducers/essaySlice';
import useDeepCompareEffect from 'use-deep-compare-effect';

const SuggestionPanel = dynamic(() => import('./SuggestionPanel'), {
  ssr: false,
  loading: () => <EditiorLoading />,
});

const ChatEditPanel = dynamic(() => import('./ChatEditPanel'), {
  ssr: false,
  loading: () => <EditiorLoading />,
});

const EssayPanel = () => {
  const [wordCount, setWordCount] = useState(0);
  const essay = useAppSelector(selectEssay);
  const {
    essayRef,
    isPolishing,
    polishResult,
    setSelectText,
    chatEditMode,
    isEvaluationOpen,
    isPlagiarismOpen,
    polishResultB,
  } = useAiEditiorContext();
  const hasPolishResult = polishResult.length > 0 || polishResultB !== '';
  const isMultScreen =
    hasPolishResult ||
    isPolishing ||
    chatEditMode ||
    isEvaluationOpen ||
    isPlagiarismOpen;

  // 检查是否有内容从其他页面传入
  useDeepCompareEffect(() => {
    if (!essayRef.current) {
      return;
    }
    if (essay.content) {
      essayRef.current.innerHTML = essay.content;
      const text = essay.content;
      const wordsArray = text.split(/\s+/);
      const nonEmptyWords = wordsArray.filter((word) => word.trim() !== '');
      setWordCount(nonEmptyWords.length);
    }
  }, [essay]);

  useEffect(() => {
    if (!essayRef.current) return;
    const observer = new MutationObserver((mutationsList) => {
      if (!essayRef.current) return;
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'childList' ||
          mutation.type === 'characterData'
        ) {
          const text = essayRef.current.innerText;
          const wordsArray = text.split(/\s+/);
          const nonEmptyWords = wordsArray.filter((word) => word.trim() !== '');
          console.log(
            '🚀 ~ file: EssayPanel.tsx:70 ~ observer ~ nonEmptyWords:',
            nonEmptyWords
          );

          setWordCount(nonEmptyWords.length);
        }
      }
    });

    const targetNode = essayRef.current;
    const config = { subtree: true, characterData: true, childList: true };

    observer.observe(targetNode, config);

    return () => {
      observer.disconnect();
    };
  }, [essayRef]);

  const onSelectionChange = useGlobalEvent('mouseup');

  onSelectionChange(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      // 处理选中文本
      if (selection.anchorNode?.parentElement?.ariaLabel !== 'essay-editor') {
        return;
      }
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
      // document.execCommand('insertHTML', false, '<br><br>');
    }
  };

  return (
    <>
      <motion.div
        layout='position'
        style={{
          justifyContent: isMultScreen ? 'flex-start' : 'center',
        }}
        className='flex h-full w-full gap-x-8 overflow-hidden p-4'
      >
        <motion.div
          layout='size'
          style={{ width: isMultScreen ? '50%' : '66.666667%' }}
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
              className='h-full w-full overflow-y-auto whitespace-pre-line break-words text-[16px] leading-loose outline-none'
              placeholder='Write your message..'
              suppressContentEditableWarning
              contentEditable={!isPolishing ? 'plaintext-only' : false}
              spellCheck={false}
            />

            <div className='flex-between absolute -bottom-6 left-0 flex h-12 w-full'>
              <p className='small-semibold text-shadow-100'>
                {wordCount}
                &nbsp;Words
              </p>
            </div>
          </div>
        </motion.div>
        {chatEditMode ? (
          <ChatEditPanel />
        ) : isPolishing ? (
          <EditiorLoading />
        ) : hasPolishResult ? (
          <SuggestionPanel />
        ) : null}
      </motion.div>
    </>
  );
};

export default EssayPanel;
