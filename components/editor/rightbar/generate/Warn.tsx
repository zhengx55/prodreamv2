import { Button } from '@/components/ui/button';
import { AnimatePresence, m } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { memo, useState } from 'react';

const Warn = () => {
  const [showWarning, setShowWarning] = useState(true);
  return (
    <AnimatePresence>
      {showWarning && (
        <m.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className='mb-5 flex w-full flex-col gap-y-4 rounded border border-gray-200 px-4 py-3'
        >
          <div className='flex items-center gap-x-3'>
            <AlertTriangle className='text-doc-warn' size={20} />
            <p className='text-doc-warn'>More text needed</p>
          </div>
          <p className='small-regular'>
            Make sure you have at least 100 words of text in your document based
            on which Prodream can generate suggestions for anabstract.
          </p>
          <Button
            onClick={() => setShowWarning((prev) => !prev)}
            variant={'outline'}
            className='subtle-regular h-max rounded border-doc-warn py-1 text-doc-warn'
          >
            Got it
          </Button>
        </m.div>
      )}
    </AnimatePresence>
  );
};
export default memo(Warn);
