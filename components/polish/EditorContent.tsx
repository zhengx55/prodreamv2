import Spacer from '@/components/root/Spacer';
import '@/lib/tiptap/styles/index.css';
import useAiEditor, { useUserTask } from '@/zustand/store';
import { EditorContent, Editor as EditorType } from '@tiptap/react';
import { AnimatePresence, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { AiMenu } from '../editor/ai-menu';
import { BubbleMenu } from '../editor/bubble-menu';
import { CitationMenu } from '../editor/citation-menu';
import { SynonymMenu } from '../editor/synonym-menu';
import LazyMotionProvider from '../root/LazyMotionProvider';

const Task = dynamic(() => import('./guide/Task'));
const Reference = dynamic(() => import('./Reference'));
type Props = { editor: EditorType };

const EditorBlock = ({ editor }: Props) => {
  const showCopilotMenu = useAiEditor((state) => state.showCopilotMenu);
  const showCitiationMenu = useAiEditor((state) => state.showCitiationMenu);
  const showSynonymMenu = useAiEditor((state) => state.showSynonymMenu);
  const shouldShowTasks = useUserTask((state) => state.shouldShowTasks);
  return (
    <div
      aria-label='editor-parent'
      id='editor-parent'
      className='relative flex w-full flex-col overflow-y-auto rounded-lg pb-[30vh]'
    >
      <Spacer y='20' />
      <LazyMotionProvider>
        <AnimatePresence>
          {shouldShowTasks && (
            <m.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className='flex flex-col'
            >
              <Task editor={editor} />
              <Spacer y='20' />
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotionProvider>
      {showSynonymMenu && <SynonymMenu editor={editor} />}
      {showCopilotMenu && <AiMenu editor={editor} />}
      {showCitiationMenu && <CitationMenu editor={editor} />}
      <BubbleMenu editor={editor} />
      <EditorContent className='flex-1' spellCheck={false} editor={editor} />
      <Spacer y='40' />
      <Reference />
    </div>
  );
};
export default memo(EditorBlock);
