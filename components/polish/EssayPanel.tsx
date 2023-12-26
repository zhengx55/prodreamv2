'use client';
import useAIEditorStore from '@/zustand/store';
import { m } from 'framer-motion';
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

  return (
    <>
      <m.div
        layout='position'
        style={{
          justifyContent: isMultiScreen ? 'flex-start' : 'center',
        }}
        className='flex h-full w-full gap-x-8 overflow-hidden p-4'
      >
        <m.div
          layout='size'
          style={{ width: isMultiScreen ? '50%' : '66.666667%' }}
          className='flex h-full flex-col'
        >
          <Tiptap />
        </m.div>
        {isChatEditMode ? (
          <ChatEditPanel />
        ) : isPolishing ? (
          <EditiorLoading />
        ) : polishResult.length > 0 || polishResultParagraph ? (
          <SuggestionPanel />
        ) : null}
      </m.div>
    </>
  );
};

export default memo(EssayPanel);
