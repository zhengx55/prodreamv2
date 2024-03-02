import Spacer from '@/components/root/Spacer';
import '@/lib/tiptap/styles/index.css';
import { useUserTrackInfo } from '@/query/query';
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
const Finish = dynamic(() => import('./guide/Task').then((mod) => mod.Finish));
const Reference = dynamic(() => import('./Reference'));
const Trigger = dynamic(() => import('./continue-writting/Trigger'));
type Props = { editor: EditorType };

const EditorBlock = ({ editor }: Props) => {
  const showCopilotMenu = useAIEditor((state) => state.showCopilotMenu);
  const showContinue = useAIEditor((state) => state.showContinue);
  const showCitiationMenu = useAIEditor((state) => state.showCitiationMenu);
  const showSynonymMenu = useAIEditor((state) => state.showSynonymMenu);
  const { data: userTrack } = useUserTrackInfo();
  const isClose = Boolean(userTrack?.basic_task);
  const isOutlineFinished = Boolean(userTrack?.outline_tip_task);
  const isContinueFinished = Boolean(userTrack?.continue_tip_task);
  const isComplete = userTrack?.highlight_task && userTrack?.grammar_task;
  const showTaskPanel =
    (isOutlineFinished || isContinueFinished) && !isComplete;
  const showCompletePanel = !isClose && isComplete;

  return (
    <div
      aria-label='editor-parent'
      id='editor-parent'
      className='relative flex w-full flex-col overflow-y-auto rounded-lg pb-[40vh] sm:pb-[30vh]'
    >
      <Spacer y='20' />
      <AnimatePresence>
        {showTaskPanel ? (
          <Task editor={editor} track={userTrack!} />
        ) : showCompletePanel ? (
          <Finish />
        ) : null}
      </AnimatePresence>
      {showSynonymMenu && <SynonymMenu editor={editor} />}
      {showCopilotMenu && <AiMenu editor={editor} />}
      {showCitiationMenu && <CitationMenu editor={editor} />}
      {showContinue && <Trigger editor={editor} />}
      <BubbleMenu editor={editor} />
      <EditorContent className='flex-1' spellCheck={false} editor={editor} />
      <Spacer y='40' />
      <Reference />
    </div>
  );
};
export default memo(EditorBlock);
