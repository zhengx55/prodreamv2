import '@/lib/tiptap/styles/index.css';
import { useUserTrackInfo } from '@/query/query';
import { useUserTask } from '@/zustand/store';
import type { Editor } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
type Props = { editor: Editor };

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
const ContinuTipSecond = dynamic(
  () => import('./tips/FloatingTip').then((mod) => mod.ContinuTipSecond),
  {
    ssr: false,
  }
);
const Procedure = ({ editor }: Props) => {
  const { data: userTrack } = useUserTrackInfo();
  const outline_step = useUserTask((state) => state.outline_step);
  const continue_step = useUserTask((state) => state.continue_step);

  const showGuidance =
    !Boolean(userTrack?.guidence) && outline_step === 0 && continue_step === 0;
  const showOutlineTip = Boolean(userTrack?.guidence) && outline_step === 1;
  const showContinueTip = Boolean(userTrack?.guidence) && continue_step === 1;
  const showContinueSecondTip =
    Boolean(userTrack?.guidence) && continue_step === 2;

  return (
    <AnimatePresence mode='wait'>
      {showGuidance && <GuidancePanel editor={editor} />}
      {showOutlineTip && <OutlineTip editor={editor} />}
      {showContinueTip && <ContinueTip editor={editor} />}
      {showContinueSecondTip && <ContinuTipSecond editor={editor} />}
    </AnimatePresence>
  );
};
export default Procedure;
