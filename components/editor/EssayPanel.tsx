'use client';
import DocNavbar from '@/components/editor/navbar/Navbar';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import type { DocPageDicType } from '@/types';
import { useModal } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
import Icon from '../root/Icon';
import LazyMotionProvider from '../root/LazyMotionProvider';
import Tooltip from '../root/Tooltip';
import { Button } from '../ui/button';
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
        <FeedbackSection />
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

const FeedbackSection = memo(() => {
  const updateFeedbackModal = useModal((state) => state.updateFeedbackModal);
  const transEditor = useTranslations('Editor');

  return (
    <div className='absolute bottom-[5%] left-5 z-10 flex flex-col gap-y-2'>
      <Tooltip tooltipContent='Join Discord' side='right'>
        <Button variant='icon' className='size-max p-1' role='link'>
          <Link href={'https://discord.gg/xXSFXv5kPd'} target='_blank'>
            <Icon width={20} height={20} alt='discord' src='/nav/discord.svg' />
          </Link>
        </Button>
      </Tooltip>

      <Tooltip
        tooltipContent={transEditor('SideBar.Contact_Support')}
        side='right'
      >
        <Button
          onClick={() => updateFeedbackModal(true)}
          variant='icon'
          className='size-max p-1'
          role='link'
        >
          <Icon
            width={20}
            height={20}
            alt={transEditor('SideBar.Contact_Support')}
            src='/nav/message.svg'
          />
        </Button>
      </Tooltip>
    </div>
  );
});
