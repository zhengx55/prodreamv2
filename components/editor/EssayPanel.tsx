'use client';
import DocNavbar from '@/components/editor/navbar/Navbar';
import { useUserTrackInfo } from '@/query/query';
import { DocPageDicType } from '@/types';
import { useUserInfo } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';
import LazyMotionProvider from '../root/LazyMotionProvider';
import Spacer from '../root/Spacer';
import { Skeleton } from '../ui/skeleton';
import { useDocumentInfo } from './rightbar/citation/hooks/useDocumentInfo';
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

type Props = {
  id: string;
} & DocPageDicType;
const EssayPanel = ({ id, ...props }: Props) => {
  const signUpTime = useUserInfo((state) => state.user.create_time);
  const { data: userTrack } = useUserTrackInfo();
  const { essayContent, loading, error } = useDocumentInfo(id);
  const showCheckList = useMemo(() => {
    const signUpDate = new Date(signUpTime * 1000);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - signUpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 7 && userTrack?.guidence;
  }, [signUpTime, userTrack?.guidence]);
  return (
    <LazyMotionProvider>
      <main className='relative flex h-full w-full flex-col'>
        {loading ? (
          <div className='flex flex-1 flex-col items-center'>
            <Spacer y='20' />
            <Skeleton className='h-10 w-[700px] rounded-lg' />
          </div>
        ) : (
          <>
            <DocNavbar {...props} />
            {showCheckList && <CheckList t={props.t} />}
            <div className='relative flex h-full w-full justify-center overflow-hidden'>
              <Editor
                essay_content={essayContent ? essayContent.content : ''}
                {...props}
              />

              <DocRightBar {...props} />
            </div>
          </>
        )}
      </main>
    </LazyMotionProvider>
  );
};

export default memo(EssayPanel);
