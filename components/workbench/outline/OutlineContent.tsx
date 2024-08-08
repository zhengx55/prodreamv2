'use client';
import { OutlineItem } from '@/types/outline';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const EditorBlock = dynamic(() => import('../editor/EditorBlock'), {
  ssr: false,
});

const GeneratingBar = dynamic(() => import('./GeneratingBar'), { ssr: false });

type Props = {
  data?: OutlineItem;
};

const OutlineContent = ({ data }: Props) => {
  return (
    <div className='flex-center relative flex-1 bg-slate-100 pt-6'>
      <EditorBlock data={data} />
      <GeneratingBar />
    </div>
  );
};

export default memo(OutlineContent);
