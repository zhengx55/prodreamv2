'use client';
import DocNavbar from '@/components/editor/navbar/Navbar';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { useUserTrackInfo } from '@/hooks/useTrackInfo';
import type { DocPageDicType, EditorDictType } from '@/types';
import { useModal, useUserInfo } from '@/zustand/store';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import Icon from '../root/Icon';
import LazyMotionProvider from '../root/LazyMotionProvider';
import Tooltip from '../root/Tooltip';
import { Button } from '../ui/button';
import { useDocumentInfo } from './hooks/useDocumentInfo';

const CheckList = dynamic(() => import('./checklist/CheckList'));
const Editor = dynamic(() => import('./Editor'), {
  ssr: false,
});

const DocRightBar = dynamic(() => import('./rightbar/DocRightBar'));

type Props = {
  id: string;
  isNew: boolean;
} & DocPageDicType;
const EssayPanel = ({ id, ...props }: Props) => {
  const signUpTime = useUserInfo((state) => state.user.create_time);
  const { data: userTrack, isPending } = useUserTrackInfo();
  const { isPending: isUsagePending } = useMembershipInfo();
  const { essayContent, loading } = useDocumentInfo(id);
  const t = useTranslations('Editor');
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
        {showCheckList ? <CheckListSection t={props.t} /> : <FeedbackSection />}
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
  const t = useTranslations('Editor');

  return (
    <div className='absolute bottom-[5%] left-5 z-10 flex flex-col gap-y-2'>
      <Tooltip tooltipContent='Join Discord' side='right'>
        <Button variant='icon' className='size-max p-1' role='link'>
          <Link href={'https://discord.gg/xXSFXv5kPd'} target='_blank'>
            <Icon width={20} height={20} alt='discord' src='/nav/discord.svg' />
          </Link>
        </Button>
      </Tooltip>

      <Tooltip tooltipContent={t('SideBar.Contact_Support')} side='right'>
        <Button
          onClick={() => updateFeedbackModal(true)}
          variant='icon'
          className='size-max p-1'
          role='link'
        >
          <Icon
            width={20}
            height={20}
            alt={t('SideBar.Contact_Support')}
            src='/nav/message.svg'
          />
        </Button>
      </Tooltip>
    </div>
  );
});

const CheckListSection = memo(({ t }: { t: EditorDictType }) => {
  const updateFeedbackModal = useModal((state) => state.updateFeedbackModal);

  const trans = useTranslations('Editor');

  return (
    <div className='absolute bottom-[5%] left-5 z-10 flex flex-col gap-y-4'>
      <CheckList t={t} />
      <Button
        onClick={() => updateFeedbackModal(true)}
        variant='icon'
        className='size-max rounded p-2'
        role='link'
      >
        <Icon
          width={20}
          height={20}
          alt={trans('SideBar.Contact_Support')}
          src='/editor/message_violet.svg'
        />
        <p className='base-regular text-zinc-600'>{trans('SideBar.Contact_Support')}</p>
      </Button>
    </div>
  );
});
