import Spacer from '@/components/root/Spacer';
import '@/lib/tiptap/styles/index.css';
import { DocPageDicType } from '@/types';
import { useAIEditor, useUserTask } from '@/zustand/store';
import { EditorContent, Editor as EditorType } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import AiMenu from './ai-menu/AiMenu';
import BubbleMenu from './bubble-menu/BubbleMenu';
import CitationMenu from './citation-menu/CitationMenu';
import { SynonymMenu } from './synonym-menu';

const Task = dynamic(() => import('./guide/Task'));
const Reference = dynamic(() => import('./Reference'));
const Trigger = dynamic(() => import('./continue-writting/Trigger'));
type Props = { editor: EditorType } & DocPageDicType;

const EditorBlock = ({ editor, ...props }: Props) => {
  const { showCopilotMenu, showContinue, showCitiationMenu, showSynonymMenu } =
    useAIEditor((state) => ({
      ...state,
    }));
  const show_task_dialog = useUserTask((state) => state.show_task_dialog);
  return (
    <div
      aria-label='editor-parent'
      id='editor-parent'
      className='relative flex w-full flex-col overflow-y-auto'
    >
      <Spacer y='20' />
      <AnimatePresence>
        {show_task_dialog ? <Task t={props.t} /> : null}
      </AnimatePresence>
      {showSynonymMenu && <SynonymMenu editor={editor} />}
      {showCopilotMenu && <AiMenu {...props} editor={editor} />}
      {showCitiationMenu && <CitationMenu editor={editor} />}
      {showContinue && <Trigger t={props.t} editor={editor} />}
      <BubbleMenu t={props.t} editor={editor} />
      <EditorContent spellCheck={false} editor={editor} />
      <Reference />
    </div>
  );
};
export default memo(EditorBlock);
