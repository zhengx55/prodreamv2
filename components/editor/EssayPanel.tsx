'use client';
import DocNavbar from '@/components/editor/navbar/Navbar';
import { useDocumentDetail } from '@/query/query';
import { useUserInfo } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';
import LazyMotionProvider from '../root/LazyMotionProvider';
import Spacer from '../root/Spacer';
import { Skeleton } from '../ui/skeleton';
import { useCitationInfo } from './rightbar/citation/hooks/useCitationInfo';
const CheckList = dynamic(() => import('./checklist/CheckList'));
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
  const { data: document_content, isPending, isError } = useDocumentDetail(id);
  const signUpTime = useUserInfo((state) => state.user.create_time);
  const showCheckList = useMemo(() => {
    const signUpDate = new Date(signUpTime * 1000);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - signUpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 7;
  }, [signUpTime]);

  useCitationInfo(document_content);
  if (isError) return null;
  return (
    <LazyMotionProvider>
      <main className='relative flex h-full w-full flex-col'>
        <DocNavbar />
        {!showCheckList && <CheckList />}
        <div className='relative flex h-full w-full justify-center overflow-hidden'>
          {isPending ? (
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
