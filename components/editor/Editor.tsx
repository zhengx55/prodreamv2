import BottomBar from '@/components/editor/bottombar';
import '@/lib/tiptap/styles/index.css';
import { useUserTrackInfo } from '@/query/query';
import { DocPageDicType } from '@/types';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import ChatTrigger from './ChatTrigger';
import Procedure from './guide/Procedure';
import useEditorInstance from './hooks/useEditorInstance';

const TableOfContents = dynamic(
  () => import('./table-of-contents/TableOfContents')
);
const EditorBlock = dynamic(() => import('./EditorBlock'));
const PaymentModal = dynamic(() => import('@/components/pricing/Modal'), {
  ssr: false,
});
const PromptView = dynamic(() => import('./modal/Prompt'), { ssr: false });

const OutlineWaitingModal = dynamic(() => import('./guide/Waiting'), {
  ssr: false,
});
const Editor = ({
  essay_content,
  isNew,
  ...props
}: { essay_content: string; isNew: boolean } & DocPageDicType) => {
  const { data: track } = useUserTrackInfo();
  const { editor, showBottomBar } = useEditorInstance(essay_content);
  if (!editor) return null;
  return (
    <section className='relative flex w-full flex-col'>
      <ChatTrigger />
      <div className='flex h-full w-full'>
        <TableOfContents editor={editor} />
        {Boolean(track?.guidence) && <EditorBlock {...props} editor={editor} />}
        <Procedure t={props.t} editor={editor} />
        <PaymentModal />
        <PromptView t={props.t} show={isNew} />
        <OutlineWaitingModal />
      </div>
      <AnimatePresence>
        {showBottomBar && <BottomBar t={props.t} editor={editor} />}
      </AnimatePresence>
    </section>
  );
};

export default memo(Editor);
