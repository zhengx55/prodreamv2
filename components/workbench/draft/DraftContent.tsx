'use client';
import dynamic from 'next/dynamic';
import { memo } from 'react';
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
  return (
    <div className='flex-center relative flex-1 bg-slate-100 pt-6'>
      <EditorBlock {...props} />
      <GeneratingBar />
    </div>
  );
};

export default memo(DraftContent);
