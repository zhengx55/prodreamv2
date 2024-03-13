'use client';
import DocNavbar from '@/components/editor/navbar';
import { useDocumentDetail } from '@/query/query';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import LazyMotionProvider from '../root/LazyMotionProvider';
import Spacer from '../root/Spacer';
import { Skeleton } from '../ui/skeleton';
import CheckList from './checklist/CheckList';
import PromptView from './modal/Prompt';
import { useCitationInfo } from './rightbar/citation/hooks/useCitationInfo';

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
  loading: () => (
    <div className='flex flex-1 flex-col items-center'>
      <Spacer y='20' />
      <Skeleton className='h-10 w-[700px] rounded-lg' />
    </div>
  ),
});
const DocRightBar = dynamic(() => import('./rightbar/DocRightBar'));

const EssayPanel = ({ id }: { id: string }) => {
  const {
    data: document_content,
    refetch,
    isFetching,
    isError,
  } = useDocumentDetail(id);

  const [showPromptView, setShowPromptView] = useState(false);

  // useEffect(() => {
  //   if (
  //     document_content &&
  //     isEmpty(document_content?.content) &&
  //     isEmpty(document_content?.brief_description)
  //   ) {
  //     setShowPromptView(true);
  //   }
  //   return () => {
  //     setShowPromptView(false);
  //   };
  // }, [document_content]);

  useCitationInfo(document_content);

  if (isError) return <p>opps something went wrong!</p>;
  return (
    <LazyMotionProvider>
      <main className='relative flex h-full w-full flex-col'>
        <DocNavbar id={id} />
        <CheckList />
        <div className='relative flex h-full w-full justify-center overflow-hidden'>
          {isFetching ? (
            <div className='flex flex-1 flex-col items-center'>
              <Spacer y='20' />
              <Skeleton className='h-10 w-[700px] rounded-lg' />
            </div>
          ) : (
            <Editor
              essay_content={document_content ? document_content.content : ''}
            />
          )}
          <DocRightBar />
        </div>
      </main>
      <PromptView id={id} showPromptView={showPromptView} />
    </LazyMotionProvider>
  );
};

export default memo(EssayPanel);
