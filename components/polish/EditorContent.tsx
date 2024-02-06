import Spacer from '@/components/root/Spacer';
import '@/lib/tiptap/styles/index.css';
import { useUserTrackInfo } from '@/query/query';
import useAiEditor from '@/zustand/store';
import { EditorContent, Editor as EditorType } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { AiMenu } from '../editor/ai-menu';
import { BubbleMenu } from '../editor/bubble-menu';
import CitationMenu from '../editor/citation-menu/CitationMenu';
import { SynonymMenu } from '../editor/synonym-menu';

const Task = dynamic(() => import('./guide/Task'));
const Finish = dynamic(() => import('./guide/Task').then((mod) => mod.Finish));
const Reference = dynamic(() => import('./Reference'));
type Props = { editor: EditorType };

const EditorBlock = ({ editor }: Props) => {
  const showCopilotMenu = useAiEditor((state) => state.showCopilotMenu);
  const showCitiationMenu = useAiEditor((state) => state.showCitiationMenu);
  const showSynonymMenu = useAiEditor((state) => state.showSynonymMenu);
  const { data: userTrack, isPending, isError } = useUserTrackInfo();
  const isClose = Boolean(userTrack?.tasks);
  const isOutlineFinished = Boolean(userTrack?.outline_tip_task);
  const isContinueFinished = Boolean(userTrack?.continue_tip_task);
  const isComplete =
    userTrack?.ai_copilot_task &&
    userTrack?.continue_writing_task &&
    userTrack?.citation_task &&
    userTrack?.generate_tool_task;
  const showTaskPanel =
    (isOutlineFinished || isContinueFinished) && !isComplete;

  const showCompletePanel = !isClose && isComplete;
  if (isPending || isError) return null;
  return (
    <div
      aria-label='editor-parent'
      id='editor-parent'
      className='relative flex w-full flex-col overflow-visible overflow-y-auto rounded-lg pb-[40vh] sm:pb-[30vh]'
    >
      <Spacer y='20' />
      <AnimatePresence>
        {showTaskPanel ? (
          <Task editor={editor} track={userTrack} />
        ) : showCompletePanel ? (
          <Finish />
        ) : null}
      </AnimatePresence>
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
