import '@/lib/tiptap/styles/index.css';
import { useUserTrackInfo } from '@/query/query';
import { EdtitorDictType } from '@/types';
import { useUserTask } from '@/zustand/store';
import type { Editor } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
type Props = { editor: Editor; t: EdtitorDictType };

const GuidancePanel = dynamic(() => import('./GuidancePanel'));

const OutlineTip = dynamic(
  () => import('./tips/FloatingTip').then((mod) => mod.OutlineTip),
  {
    ssr: false,
  }
);
const ContinueTip = dynamic(
  () => import('./tips/FloatingTip').then((mod) => mod.ContinueTip),
  {
    ssr: false,
  }
);

const Procedure = ({ editor, t }: Props) => {
  const { data: userTrack } = useUserTrackInfo();
  const outline_step = useUserTask((state) => state.outline_step);
  const continue_step = useUserTask((state) => state.continue_step);

  const showGuidance =
    !Boolean(userTrack?.guidence) && outline_step === 0 && continue_step === 0;
  const showOutlineTip = Boolean(userTrack?.guidence) && outline_step === 1;
  const showContinueTip = Boolean(userTrack?.guidence) && continue_step === 1;

  return (
    <AnimatePresence mode='wait'>
      {showGuidance && <GuidancePanel t={t} editor={editor} />}
      {showOutlineTip && <OutlineTip editor={editor} />}
      {showContinueTip && <ContinueTip editor={editor} />}
    </AnimatePresence>
  );
};
export default Procedure;
