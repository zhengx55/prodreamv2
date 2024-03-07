'use client';
import DocNavbar from '@/components/editor/navbar';
import { useDocumentDetail } from '@/query/query';
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
    <div className='flex flex-col items-center flex-1'>
      <Spacer y='20' />
      <Skeleton className='h-10 w-[700px] rounded-lg' />
    </div>
  ),
});
const DocRightBar = dynamic(() => import('./rightbar/DocRightBar'));

const EssayPanel = ({ id }: { id: string }) => {
  const { data: document_content, isFetching, isError } = useDocumentDetail(id);
  useCitationInfo(document_content);

  if (isError) return <p>opps something went wrong!</p>;
  return (
    <LazyMotionProvider>
      <main className='relative flex flex-col w-full h-full'>
        <DocNavbar id={id}/>
        <CheckList />
        <div className='relative flex justify-center w-full h-full overflow-hidden'>
          {isFetching ? (
            <div className='flex flex-col items-center flex-1'>
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
