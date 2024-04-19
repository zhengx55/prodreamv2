import { DocPageDicType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import General from './chatbot/General';

const DocRightBar = (props: DocPageDicType) => {
  const rightbarOpen = useAIEditor((state) => state.rightbarOpen);
  return (
    <>
      <General.Trigger {...props} />
      <AnimatePresence>
        {rightbarOpen && <General {...props} />}
      </AnimatePresence>
    </>
  );
};

export default memo(DocRightBar);
