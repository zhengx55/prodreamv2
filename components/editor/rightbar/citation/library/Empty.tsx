import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { useAIEditor } from '@/zustand/store';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

const Empty = () => {
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex-center mt-4 w-full max-w-max flex-col gap-y-2 border border-gray-200 p-4'
      >
        <Image
          alt='citation'
          src='/editor/Citation.png'
          width={300}
          height={200}
          className='h-auto w-3/5'
        />
        <p className='small-regular text-center text-zinc-600'>
          Your library is currently empty.
          <br /> Try search for citations 😊
        </p>
        <Spacer y='14' />
        <Button
          role='button'
          onClick={() => updateRightbarTab(3)}
          className='h-max w-full border border-violet-500 py-1 text-violet-500'
          variant={'ghost'}
        >
          Add Citation
        </Button>
      </m.div>
    </AnimatePresence>
  );
};
export default memo(Empty);
