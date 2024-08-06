'use client';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const EditorBlock = dynamic(() => import('./EditorBlock'), {
  ssr: false,
});
type Props = {
  defaultHTML?: string;
};

const OutlineContent = ({ defaultHTML }: Props) => {
  return (
    <div className='flex-center flex-1 bg-slate-100 pt-6'>
      <EditorBlock />
    </div>
  );
};

export default memo(OutlineContent);
