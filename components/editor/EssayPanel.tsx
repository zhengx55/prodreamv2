'use client';
import DocNavbar from '@/components/editor/navbar/Navbar';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import type { DocPageDicType } from '@/types';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import LazyMotionProvider from '../root/LazyMotionProvider';
import { useDocumentInfo } from './hooks/useDocumentInfo';

const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

const DocRightBar = dynamic(() => import('./rightbar/DocRightBar'));

type Props = {
  id: string;
  isNew: boolean;
} & DocPageDicType;
const EssayPanel = ({ id, ...props }: Props) => {
  const { isPending: isUsagePending } = useMembershipInfo();
  const { essayContent, loading } = useDocumentInfo(id);
  const t = useTranslations('Editor');

  if (isUsagePending || loading)
    return (
      <div className='flex-center flex-1 items-center'>
        <Loader2 size={30} className='animate-spin text-violet-500' />
      </div>
    );
  return (
    <LazyMotionProvider>
      <main className='relative flex h-full w-full flex-col'>
        <DocNavbar {...props} />
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
