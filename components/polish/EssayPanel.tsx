'use client';
import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import EditiorLoading from './EditiorLoading';
import dynamic from 'next/dynamic';
import useGlobalEvent from 'beautiful-react-hooks/useGlobalEvent';
import useAIEditorStore from '@/zustand/store';
const SuggestionPanel = dynamic(
  () => import('./polish_suggestion/SuggestionPanel'),
  {
    ssr: false,
    loading: () => <EditiorLoading />,
  }
);

const Tiptap = dynamic(() => import('./Editor'), { ssr: false });

const ChatEditPanel = dynamic(() => import('./chat_edit/ChatEditPanel'), {
  ssr: false,
  loading: () => <EditiorLoading />,
});

const EssayPanel = () => {
  const isChatEditMode = useAIEditorStore((state) => state.isChatEditMode);
  const isPolishing = useAIEditorStore((state) => state.isPolishing);
  const polishResult = useAIEditorStore((state) => state.polishResult);
  const isEvaluationOpen = useAIEditorStore((state) => state.isEvaluationOpen);
  const isPlagiarismOpen = useAIEditorStore((state) => state.isPlagiarismOpen);
  const polishResultParagraph = useAIEditorStore(
    (state) => state.polishResultWholeParagraph
  );

  const isMultiScreen =
    isPolishing ||
    isChatEditMode ||
    polishResult.length > 0 ||
    polishResultParagraph ||
    isPlagiarismOpen ||
    isEvaluationOpen;

  const updateSelectText = useAIEditorStore((state) => state.updateSelectText);

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
          {/* <ContentEditable
              html={editor_html}
              onKeyDown={handleKeyDown}
              aria-label='essay-editor'
              className='h-full w-full overflow-y-auto whitespace-pre-line break-words text-[16px] leading-loose outline-none'
              tagName='article'
              disabled={false}
              onChange={handleInput}
              spellCheck={false}
              contentEditable='plaintext-only'
            /> */}

          <Tiptap />
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
