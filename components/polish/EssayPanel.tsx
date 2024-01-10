'use client';
import { IDocDetail } from '@/query/type';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
const Tiptap = dynamic(() => import('./Editor'), { ssr: false });

const EssayPanel = ({
  isFetching,
  isError,
  document_content,
}: {
  isFetching: boolean;
  isError: boolean;
  document_content: IDocDetail | undefined;
}) => {
  if (isError) return null;
  return (
    <div className='flex h-full w-full justify-center overflow-hidden px-2'>
      <div className='flex flex-1 flex-col'>
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
      </div>
    </div>
  );
};

export default memo(EssayPanel);
