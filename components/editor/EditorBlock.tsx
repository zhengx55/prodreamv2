import Spacer from '@/components/root/Spacer';
import '@/lib/tiptap/styles/index.css';
import { useUserTrackInfo } from '@/query/query';
import { DocPageDicType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { EditorContent, Editor as EditorType } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import AiMenu from './ai-menu/AiMenu';
import BubbleMenu from './bubble-menu/BubbleMenu';
import CitationMenu from './citation-menu/CitationMenu';
import { SynonymMenu } from './synonym-menu';

const Task = dynamic(() => import('./guide/Task'));
// const Finish = dynamic(() => import('./guide/Task').then((mod) => mod.Finish));
const Reference = dynamic(() => import('./Reference'));
const Trigger = dynamic(() => import('./continue-writting/Trigger'));
type Props = { editor: EditorType } & DocPageDicType;

const EditorBlock = ({ editor, ...props }: Props) => {
  const { showCopilotMenu, showContinue, showCitiationMenu, showSynonymMenu } =
    useAIEditor((state) => ({
      ...state,
    }));
  const { data: userTrack } = useUserTrackInfo();
  const isOutlineFinished = Boolean(userTrack?.outline_tip_task);
  const showTaskPanel = isOutlineFinished;
  return (
    <div
      aria-label='editor-parent'
      id='editor-parent'
      className='relative flex w-full flex-col overflow-y-auto pb-[40vh] sm:pb-[30vh]'
    >
      <Spacer y='20' />
      <AnimatePresence>
        {showTaskPanel ? <Task editor={editor} t={props.t} /> : null}
      </AnimatePresence>
      {showSynonymMenu && <SynonymMenu editor={editor} />}
      {showCopilotMenu && <AiMenu {...props} editor={editor} />}
      {showCitiationMenu && <CitationMenu editor={editor} />}
      {showContinue && <Trigger editor={editor} />}
      <BubbleMenu t={props.t} editor={editor} />
      <EditorContent className='flex-1' spellCheck={false} editor={editor} />
      <Spacer y='40' />
      <Reference />
    </div>
  );
};
export default memo(EditorBlock);
