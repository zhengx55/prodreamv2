import Spacer from '@/components/root/Spacer';
import '@/lib/tiptap/styles/index.css';
import { DocPageDicType } from '@/types';
import { useAIEditor, useUserTask } from '@/zustand/store';
import { EditorContent, Editor as EditorType } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Reference from './Reference';
import BubbleMenu from './bubble-menu/BubbleMenu';

const AiMenu = dynamic(() => import('./ai-menu/AiMenu'));
const CitationMenu = dynamic(() => import('./citation-menu/CitationMenu'));
const SynonymMenu = dynamic(() => import('./synonym-menu/SynonymMenu'));
const Task = dynamic(() => import('./guide/Task'));
const Trigger = dynamic(() => import('./continue-writting/Trigger'));

type Props = { editor: EditorType } & DocPageDicType;

const EditorBlock = ({ editor, ...props }: Props) => {
  const showCopilotMenu = useAIEditor((state) => state.showCopilotMenu);
  const showContinue = useAIEditor((state) => state.showContinue);
  const showCitiationMenu = useAIEditor((state) => state.showCitiationMenu);
  const showSynonymMenu = useAIEditor((state) => state.showSynonymMenu);
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
      <BubbleMenu editor={editor} />
      <EditorContent spellCheck={false} editor={editor} />
      <Reference />
    </div>
  );
};
export default memo(EditorBlock);
