'use client';
import DocNavbar from '@/components/editor/navbar';
import { getDocDetail } from '@/query/api';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
import { useCitationInfo } from '../editor/rightbar/citation/hooks/useCitationInfo';
import Spacer from '../root/Spacer';
import { Feedback } from '../root/SvgComponents';
import Tooltip from '../root/Tooltip';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const OnBoard = dynamic(() => import('../editor/modal/onBoard'));
const Tiptap = dynamic(() => import('./Editor'), {
  loading: () => (
    <div className='flex flex-1 flex-col items-center'>
      <Spacer y='30' />
      <Skeleton className='h-10 w-[700px] rounded-lg' />
    </div>
  ),
});

const DocRightBar = dynamic(() => import('../editor/rightbar/DocRightBar'));

const EssayPanel = ({ id, user_info }: { id: string; user_info: any }) => {
  const {
    data: document_content,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['document_item', id],
    queryFn: () => getDocDetail(id),
  });
  useCitationInfo(document_content);

  if (isError) return null;

  return (
    <main className='relative flex h-full w-full flex-col justify-center'>
      <DocNavbar />
      <Tooltip defaultOpen side='right' tooltipContent='submit feedback'>
        <Link
          passHref
          href={'https://tally.so/r/3NovEO'}
          className='absolute bottom-[10%] left-2 z-50'
          target='_blank'
        >
          <Button className='rounded-xl bg-doc-secondary p-2.5' role='link'>
            <Feedback />
          </Button>
        </Link>
      </Tooltip>
      <OnBoard user_info={user_info} />
      <div className='relative flex h-full w-full justify-center overflow-hidden'>
        {isFetching ? (
          <div className='flex flex-1 flex-col items-center'>
            <Spacer y='30' />
            <Skeleton className='h-10 w-[700px] rounded-lg' />
          </div>
        ) : (
          <Tiptap
            essay_content={document_content ? document_content.content : ''}
          />
        )}
        <DocRightBar />
      </div>
    </main>
  );
};

export default memo(EssayPanel);
