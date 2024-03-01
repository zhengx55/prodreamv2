'use client';
import DocNavbar from '@/components/editor/navbar';
import { useDocumentDetail, useUserTrackInfo } from '@/query/query';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import LazyMotionProvider from '../root/LazyMotionProvider';
import Spacer from '../root/Spacer';
import { Skeleton } from '../ui/skeleton';
import CheckList from './checklist/CheckList';
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
  const { data: document_content, isFetching, isError } = useDocumentDetail(id);
  useCitationInfo(document_content);
  const { isPending, isError: isTrackingError } = useUserTrackInfo();
  if (isPending) return null;
  if (isError || isTrackingError) return <p>opps something went wrong!</p>;
  return (
    <LazyMotionProvider>
      <main className='relative flex h-full w-full flex-col'>
        <DocNavbar />
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
    </LazyMotionProvider>
  );
};

export default memo(EssayPanel);
