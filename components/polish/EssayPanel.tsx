'use client';
import DocNavbar from '@/components/editor/navbar';
import useMount from '@/hooks/useMount';
import { getDocDetail } from '@/query/api';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
import { useCitationInfo } from '../editor/rightbar/citation/hooks/useCitationInfo';
import Spacer from '../root/Spacer';
import { Skeleton } from '../ui/skeleton';

const OnBoard = dynamic(() => import('../editor/modal/onBoard'));
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
  const [showRightBar, setShowRightBar] = useState(false);
  const [showOnboard, setShowOnboard] = useState(false);
  useMount(() => {
    if (!user_info || !user_info.document_dialog) {
      setShowOnboard(true);
    }
  });
  const memoToggleOnBoard = useCallback((value: boolean) => {
    setShowOnboard(value);
  }, []);
  const memoToggleRightBar = useCallback((value: boolean) => {
    setShowRightBar(value);
  }, []);

  if (isError) return null;

  return (
    <main className='relative flex h-full w-full flex-col justify-center'>
      <DocNavbar title={document_content ? document_content.title : ''} />
      {/* <OnBoard open={showOnboard} toogleOpen={memoToggleOnBoard} /> */}
      <div className='relative flex h-full w-full justify-center overflow-hidden'>
        {isFetching ? (
          <div className='flex flex-1 flex-col items-center'>
            <Spacer y='30' />
            <Skeleton className='h-10 w-[750px] rounded-lg' />
          </div>
        ) : (
          <Tiptap
            essay_title={document_content ? document_content.title : ''}
            essay_content={document_content ? document_content.content : ''}
          />
        )}
        <DocRightBar show={showRightBar} toggle={memoToggleRightBar} />
      </div>
    </main>
  );
};

export default memo(EssayPanel);
