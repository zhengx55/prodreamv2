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

const OutlineContent = (props: Props) => {
  return (
    <div className='flex-start 2xl:flex-center relative flex-1 bg-slate-100 px-4 pt-[62px] 2xl:px-0'>
      <EditorBlock {...props} />
      <GeneratingBar />
    </div>
  );
};

export default memo(OutlineContent);
