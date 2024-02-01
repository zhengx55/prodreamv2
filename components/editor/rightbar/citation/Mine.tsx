import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

const InTextList = dynamic(() => import('./InTextList'));
const LibraryList = dynamic(() => import('./LibraryList'));

const Mine = () => {
  const [showMine, setShowMine] = useState(false);
  const [type, setType] = useState<number | null>(null);

  return (
    <m.div
      initial={false}
      variants={{
        show: { height: '80%' },
        hide: { height: '40px' },
      }}
      transition={{ delay: 0.2 }}
      animate={showMine ? 'show' : 'hide'}
      className='absolute bottom-0 flex w-full flex-col gap-x-2 border-t border-shadow-border bg-white'
    >
      <div className='flex-between items-center py-1.5'>
        <div className='flex items-center gap-x-2'>
          <Book />
          <p className='small-regular text-doc-primary'>My Libary</p>
        </div>
        <div className='flex items-center gap-x-2'>
          <Toggle
            pressed={type === 0}
            onPressedChange={(pressed) => {
              if (pressed) {
                setShowMine(true);
                setType(0);
              } else {
                setType(null);
              }
            }}
            className='small-regular text-doc-shadow data-[state=on]:bg-doc-primary/20 data-[state=on]:text-doc-primary'
          >
            All
          </Toggle>
          <Toggle
            pressed={type === 1}
            onPressedChange={(pressed) => {
              if (pressed) {
                setShowMine(true);
                setType(1);
              } else {
                setType(null);
              }
            }}
            className='small-regular text-doc-shadow data-[state=on]:bg-doc-primary/20 data-[state=on]:text-doc-primary'
          >
            In this doc
          </Toggle>
          <Button
            onClick={() => setShowMine((prev) => !prev)}
            className='h-max w-max rounded bg-doc-primary px-2 py-1'
          >
            <ChevronUp
              className={`${showMine && 'rotate-180 transition-transform'}`}
              size={18}
            />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {showMine && (type === 0 ? <LibraryList /> : <InTextList />)}
      </AnimatePresence>
    </m.div>
  );
};
export default memo(Mine);
