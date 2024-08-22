'use client';
import { useRightbar } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useUnmount } from 'react-use';
const EditorBlock = dynamic(() => import('../editor/EditorBlock'), {
  ssr: false,
});

const GeneratingBar = dynamic(() => import('../common/GeneratingBar'), {
  ssr: false,
});

type Props = {
  title?: string;
  content?: string;
  html?: string;
};

const DraftContent = (props: Props) => {
  const stopPlagiarismTimer = useRightbar((state) => state.stopPlagiarismTimer);
  const updatePlagiarismLoading = useRightbar(
    (state) => state.updatePlagiarismLoading
  );
  useUnmount(() => {
    stopPlagiarismTimer();
    updatePlagiarismLoading(false);
  });
  return (
    <div className='flex-center relative flex-1 bg-[#F6F7FB] pt-[62px]'>
      <EditorBlock {...props} />
      <GeneratingBar />
    </div>
  );
};

export default memo(DraftContent);
