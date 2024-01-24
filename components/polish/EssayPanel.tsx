'use client';
import { IDocDetail } from '@/query/type';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
import Spacer from '../root/Spacer';
import { Skeleton } from '../ui/skeleton';

const Tiptap = dynamic(() => import('./Editor'), {
  ssr: false,
  loading: () => (
    <div className='flex flex-1 flex-col items-center'>
      <Spacer y='30' />
      <Skeleton className='h-10 w-[750px] rounded-lg' />
    </div>
  ),
});

const DocRightBar = dynamic(() =>
  import('../editor/rightbar').then((mod) => mod.DocRightBar)
);

const EssayPanel = ({
  isFetching,
  isError,
  document_content,
}: {
  isFetching: boolean;
  isError: boolean;
  document_content: IDocDetail | undefined;
}) => {
  const [showRightBar, setShowRightBar] = useState(false);
  const memoToggleRightBar = useCallback((value: boolean) => {
    setShowRightBar(value);
  }, []);

  if (isError) return null;

  return (
    <div className='relative flex h-full w-full justify-center overflow-hidden'>
      {isFetching ? (
        <div className='flex flex-1 flex-col items-center'>
          <Spacer y='30' />
          <Skeleton className='h-10 w-[750px] rounded-lg' />
        </div>
      ) : (
        <Tiptap
          essay_title={document_content ? document_content.title : ''}
          essay_content=''
        />
      )}
      <DocRightBar show={showRightBar} toggle={memoToggleRightBar} />
    </div>
  );
};

export default memo(EssayPanel);
