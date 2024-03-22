import { Button } from '@/components/ui/button';
import { useMembershipInfo } from '@/query/query';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';
import Unlock from '../Unlock';

const Plagiarism = () => {
  const { data: membership } = useMembershipInfo();
  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      <AnimatePresence mode='wait'>
        {membership?.subscription === 'basic' ? (
          <Unlock text={'Unlock paraphrase suggestions withUnlimited Plan'} />
        ) : (
          <Starter />
        )}
      </AnimatePresence>
    </div>
  );
};

const Starter = () => (
  <m.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    key={'grammer-check'}
    className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'
  >
    <Image
      src='/editor/Start.png'
      alt='plagiarism check'
      width={450}
      height={270}
      className='h-44 w-60 self-center'
      priority
    />
    <p className='text-center text-sm font-normal text-zinc-600'>
      Click to start checking for potential duplication issues in the article.
    </p>

    <Button
      className='base-regular h-max w-max self-center rounded-full bg-doc-primary px-20'
      role='button'
    >
      Start Plaglarism Check
    </Button>
  </m.div>
);

export default memo(Plagiarism);
