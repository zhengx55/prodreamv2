'use client';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const EditorBlock = dynamic(() => import('../editor/EditorBlock'), {
  ssr: false,
});

const GeneratingBar = dynamic(() => import('./GeneratingBar'), { ssr: false });

type Props = {
  defaultHTML?: string;
  defaultContent?: string;
};

const OutlineContent = ({ defaultHTML, defaultContent }: Props) => {
  return (
    <div className='flex-center relative flex-1 bg-slate-100 pt-6'>
      <EditorBlock defaultHTML={defaultHTML} defaultContent={defaultContent} />
      <GeneratingBar />
    </div>
  );
};

export default memo(OutlineContent);
