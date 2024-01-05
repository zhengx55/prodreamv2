'use client';
import { IDocDetail } from '@/query/type';
import useRootStore from '@/zustand/store';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import EditiorLoading from './EditiorLoading';
const SuggestionPanel = dynamic(
  () => import('./polish_suggestion/SuggestionPanel'),
  {
    loading: () => <EditiorLoading />,
  }
);
const Tiptap = dynamic(() => import('./Editor'), { ssr: false });
const ChatEditPanel = dynamic(() => import('./chat_edit/ChatEditPanel'), {
  loading: () => <EditiorLoading />,
});

const EssayPanel = ({ detail }: { detail: IDocDetail | null }) => {
  const isChatEditMode = useRootStore((state) => state.isChatEditMode);
  const isPolishing = useRootStore((state) => state.isPolishing);
  const polishResult = useRootStore((state) => state.polishResult);
  const isEvaluationOpen = useRootStore((state) => state.isEvaluationOpen);
  const isPlagiarismOpen = useRootStore((state) => state.isPlagiarismOpen);
  const polishResultParagraph = useRootStore(
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
        style={{ width: isMultiScreen ? '50%' : '750px' }}
        className='flex h-full flex-col'
      >
        <Tiptap
          essay_title={detail ? detail.title : ''}
          essay_content={detail ? detail.text : ''}
        />
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
