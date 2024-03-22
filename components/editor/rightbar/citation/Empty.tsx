import { Button } from '@/components/ui/button';
import { useMutateTrackInfo } from '@/query/query';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';

const Empty = () => {
  const { mutateAsync: updateTrack } = useMutateTrackInfo();

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
        <p className='small-regular text-center text-doc-font'>
          Your library is currently empty. Try search for citations 😊
        </p>
        <Button
          role='button'
          onClick={async () => {
            await updateTrack({
              field: 'citation_empty_check',
              data: true,
            });
          }}
          className='h-max w-full border border-doc-primary py-1 text-doc-primary'
          variant={'ghost'}
        >
          Got it
        </Button>
      </m.div>
    </AnimatePresence>
  );
};
export default Empty;
