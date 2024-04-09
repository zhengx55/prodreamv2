'use client';
import DocNavbar from '@/components/editor/navbar/Navbar';
import { useMembershipInfo, useUserTrackInfo } from '@/query/query';
import { DocPageDicType } from '@/types';
import { useUserInfo } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';
import LazyMotionProvider from '../root/LazyMotionProvider';
import { useDocumentInfo } from './rightbar/citation/hooks/useDocumentInfo';
const CheckList = dynamic(() => import('./checklist/CheckList'));
const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

const DocRightBar = dynamic(() => import('./rightbar/chatbot/DocRightBar'));

type Props = {
  id: string;
} & DocPageDicType;
const EssayPanel = ({ id, ...props }: Props) => {
  const signUpTime = useUserInfo((state) => state.user.create_time);
  const { data: userTrack, isPending } = useUserTrackInfo();
  const { isPending: isUsagePending } = useMembershipInfo();
  const { essayContent, loading, error } = useDocumentInfo(id);
  const showCheckList = useMemo(() => {
    const signUpDate = new Date(signUpTime * 1000);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - signUpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 7 && userTrack?.guidence && !userTrack.close_checkList;
  }, [signUpTime, userTrack?.close_checkList, userTrack?.guidence]);
  if (isPending || isUsagePending || loading)
    return (
      <div className='flex-center flex-1 items-center'>
        <Loader2 size={30} className='animate-spin text-violet-500' />
      </div>
    );
  return (
    <LazyMotionProvider>
      <main className='relative flex h-full w-full flex-col'>
        <DocNavbar {...props} />
        {showCheckList && <CheckList t={props.t} />}
        <div className='relative flex h-full w-full justify-center overflow-hidden'>
          <Editor
            essay_content={essayContent ? essayContent.content : ''}
            {...props}
          />
          <DocRightBar {...props} />
        </div>
      </main>
    </LazyMotionProvider>
  );
};

export default memo(EssayPanel);
