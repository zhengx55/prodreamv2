import useAiEditor from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import General from './General';
import Report from './plagiarism/Report';

const DocRightBar = () => {
  const rightbarOpen = useAiEditor((state) => state.rightbarOpen);
  const isPlagiarismOpen = useAiEditor((state) => state.isPlagiarismOpen);
  return (
    <AnimatePresence mode='wait'>
      {rightbarOpen ? (
        <General />
      ) : !isPlagiarismOpen ? (
        <General.Trigger />
      ) : (
        <Report />
      )}
    </AnimatePresence>
  );
};

export default memo(DocRightBar);
