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
    <div className='flex-start 2xl:flex-center relative flex-1 bg-[#F6F7FB] pt-[62px]'>
      <EditorBlock {...props} />
      <GeneratingBar />
    </div>
  );
};

export default memo(OutlineContent);
