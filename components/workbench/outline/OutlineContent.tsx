'use client';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const EditorBlock = dynamic(() => import('./editor/EditorBlock'), {
  ssr: false,
});
type Props = {};

const OutlineContent = (props: Props) => {
  return (
    <div className='flex-center flex-1 bg-slate-100 pt-6'>
      <EditorBlock />
    </div>
  );
};

export default memo(OutlineContent);
