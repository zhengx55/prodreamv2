import { useAIEditor } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import General from './General';

const DocRightBar = () => {
  const rightbarOpen = useAIEditor((state) => state.rightbarOpen);
  return (
    <>
      <General.Trigger />
      <AnimatePresence>{rightbarOpen && <General />}</AnimatePresence>
    </>
  );
};

export default memo(DocRightBar);
