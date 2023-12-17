'use client';
import { memo, useMemo } from 'react';
import EditBar from './EditBar';
import { motion } from 'framer-motion';
import EditiorLoading from './EditiorLoading';
import dynamic from 'next/dynamic';
import useGlobalEvent from 'beautiful-react-hooks/useGlobalEvent';
import useAIEditorStore from '@/zustand/store';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { removeHtmlTags } from '@/lib/utils';

const SuggestionPanel = dynamic(() => import('./SuggestionPanel'), {
  ssr: false,
  loading: () => <EditiorLoading />,
});

const ChatEditPanel = dynamic(() => import('./ChatEditPanel'), {
  ssr: false,
  loading: () => <EditiorLoading />,
});

const EssayPanel = () => {
  const editor_html = useAIEditorStore((state) => state.editor_html);
  const isChatEditMode = useAIEditorStore((state) => state.isChatEditMode);
  const isPolishing = useAIEditorStore((state) => state.isPolishing);
  const polishResult = useAIEditorStore((state) => state.polishResult);
  const isEvaluationOpen = useAIEditorStore((state) => state.isEvaluationOpen);
  const isPlagiarismOpen = useAIEditorStore((state) => state.isPlagiarismOpen);
  const polishResultParagraph = useAIEditorStore(
    (state) => state.polishResultWholeParagraph
  );
  const updateHtml = useAIEditorStore((state) => state.updateEditor_html);

  const isMultiScreen =
    isPolishing ||
    isChatEditMode ||
    polishResult.length > 0 ||
    polishResultParagraph ||
    isPlagiarismOpen ||
    isEvaluationOpen;

  const updateSelectText = useAIEditorStore((state) => state.updateSelectText);

  const handleInput = (event: ContentEditableEvent) => {
    updateHtml(event.target.value);
  };

  const eassyWordCount = useMemo(() => {
    const wordsArray = removeHtmlTags(editor_html).split(/\s+/);
    const nonEmptyWords = wordsArray.filter((word) => word.trim() !== '');
    return nonEmptyWords.length;
  }, [editor_html]);

  const onSelectionChange = useGlobalEvent('mouseup');

  onSelectionChange(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      // 处理选中文本
      if (selection.anchorNode?.parentElement?.ariaLabel !== 'essay-editor') {
        return;
      }
      updateSelectText(selection.getRangeAt(0).toString());
    }
  });

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === 'Enter') {
      // 阻止回车键的默认行为
      event.preventDefault();
    }
  };

  return (
    <>
      <motion.div
        layout='position'
        style={{
          justifyContent: isMultiScreen ? 'flex-start' : 'center',
        }}
        className='flex h-full w-full gap-x-8 overflow-hidden p-4'
      >
        <motion.div
          layout='size'
          style={{ width: isMultiScreen ? '50%' : '66.666667%' }}
          className='flex h-full flex-col'
        >
          <EditBar />
          <div
            aria-label='editor-parent'
            className={`relative flex h-[calc(100%_-50px)] w-full flex-col rounded-lg py-6`}
          >
            <ContentEditable
              html={editor_html}
              onKeyDown={handleKeyDown}
              aria-label='essay-editor'
              className='h-full w-full overflow-y-auto whitespace-pre-line break-words text-[16px] leading-loose outline-none'
              tagName='article'
              disabled={false}
              onChange={handleInput}
              spellCheck={false}
            />

            <div className='flex-between absolute -bottom-6 left-0 flex h-12 w-full'>
              <p className='small-semibold text-shadow-100'>
                {eassyWordCount}
                &nbsp;Words
              </p>
            </div>
          </div>
        </motion.div>
        {isChatEditMode ? (
          <ChatEditPanel />
        ) : isPolishing ? (
          <EditiorLoading />
        ) : polishResult.length > 0 || polishResultParagraph ? (
          <SuggestionPanel />
        ) : null}
      </motion.div>
    </>
  );
};

export default memo(EssayPanel);
