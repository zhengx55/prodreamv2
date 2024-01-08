'use client';
import { getDocDetail } from '@/query/api';
import useRootStore from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
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

const EssayPanel = ({ id }: { id: string }) => {
  const {
    data: document_content,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['document_item', id],
    queryFn: () => getDocDetail(id),
  });
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

  if (isError) return null;
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
        {isFetching ? (
          <div className='w-full'>
            <Skeleton className='h-10 w-full rounded-lg' />
          </div>
        ) : (
          <Tiptap
            essay_title={document_content ? document_content.title : ''}
            essay_content={document_content ? document_content.text : ''}
          />
        )}
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
