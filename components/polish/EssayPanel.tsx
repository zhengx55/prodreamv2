'use client';
import useAIEditorStore from '@/zustand/store';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import EditiorLoading from './EditiorLoading';
const SuggestionPanel = dynamic(
  () => import('./polish_suggestion/SuggestionPanel'),
  {
    ssr: false,
    loading: () => <EditiorLoading />,
  }
);
const Tiptap = dynamic(() => import('./Editor'));
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

  return (
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
  );
};

export default memo(EssayPanel);
