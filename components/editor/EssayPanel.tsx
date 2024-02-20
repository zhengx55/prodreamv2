'use client';
import DocNavbar from '@/components/editor/navbar';
import { useDocumentDetail } from '@/query/query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
import LazyMotionProvider from '../root/LazyMotionProvider';
import Spacer from '../root/Spacer';
import { Feedback } from '../root/SvgComponents';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
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
  if (isError) return <p>opps something went wrong!</p>;
  return (
    <LazyMotionProvider>
      <main className='relative flex h-full w-full flex-col'>
        <DocNavbar />
        <Link
          passHref
          href={'https://tally.so/r/3NovEO'}
          className='absolute bottom-[10%] left-2 z-50'
          target='_blank'
        >
          <Button
            className='rounded-lg border border-doc-secondary bg-transparent p-3 text-doc-font hover:bg-doc-secondary'
            role='link'
          >
            <Feedback /> Submit Feedback
          </Button>
        </Link>
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
