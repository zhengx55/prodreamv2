'use client';
import { IDocDetail } from '@/query/type';
import useRootStore from '@/zustand/store';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
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

const EssayPanel = ({
  isFetching,
  isError,
  document_content,
}: {
  isFetching: boolean;
  isError: boolean;
  document_content: IDocDetail | undefined;
}) => {
  const isChatEditMode = useRootStore((state) => state.isChatEditMode);
  const isPolishing = useRootStore((state) => state.isPolishing);
  const polishResult = useRootStore((state) => state.polishResult);
  const isEvaluationOpen = useRootStore((state) => state.isEvaluationOpen);
  const isPlagiarismOpen = useRootStore((state) => state.isPlagiarismOpen);
  const polishResultParagraph = useRootStore(
    (state) => state.polishResultWholeParagraph
  );
  const deactivateSaving = useRootStore((state) => state.deactivateSaving);
  const activeSaving = useRootStore((state) => state.activeSaving);
  const isMultiScreen =
    isPolishing ||
    isChatEditMode ||
    polishResult.length > 0 ||
    polishResultParagraph ||
    isPlagiarismOpen ||
    isEvaluationOpen;

  useUpdateEffect(() => {
    if (isMultiScreen) {
      deactivateSaving();
    } else {
      activeSaving();
    }
  }, [isMultiScreen]);

  if (isError) return null;
  return (
    <div className='flex h-full w-full justify-center gap-x-8 overflow-hidden px-2'>
      <motion.div
        layout='size'
        style={{ width: isMultiScreen ? '50%' : '100%' }}
        className='flex h-full flex-col'
      >
        {isFetching ? (
          <div className='flex-center w-full'>
            <Skeleton className='h-10 w-[750px] rounded-lg' />
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
    </div>
  );
};

export default memo(EssayPanel);
