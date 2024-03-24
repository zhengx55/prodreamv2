import { DocPageDicType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import General from './General';

const DocRightBar = ({ t, lang }: DocPageDicType) => {
  const rightbarOpen = useAIEditor((state) => state.rightbarOpen);
  return (
    <>
      <General.Trigger t={t} lang={lang} />
      <AnimatePresence>
        {rightbarOpen && <General t={t} lang={lang} />}
      </AnimatePresence>
    </>
  );
};

export default memo(DocRightBar);
