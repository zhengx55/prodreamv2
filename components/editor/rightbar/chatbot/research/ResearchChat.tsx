import Spacer from '@/components/root/Spacer';
import { EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import ResearchCover from './ResearchCover';
import ResearchSection from './ResearchSection';
import ReserchTitle from './ReserchTitle';
const DeleteModal = dynamic(() => import('../chat/history/DeleteModal'));
type Props = { t: EditorDictType };
const ResearchChat = ({ t }: Props) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const researchList = useChatbot((state) => state.researchList);
  return (
    <div
      ref={setContainer}
      className='flex h-full w-full flex-col overflow-hidden'
    >
      <ReserchTitle t={t} />
      <DeleteModal t={t} container={container} />
      <Spacer y='30' />
      {researchList.length === 0 ? (
        <ResearchCover t={t} />
      ) : (
        <ResearchSection t={t} />
      )}
    </div>
  );
};
export default memo(ResearchChat);
