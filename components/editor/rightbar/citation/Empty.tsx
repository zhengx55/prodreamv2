import { Button } from '@/components/ui/button';
import { useMutateTrackInfo } from '@/query/query';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';

const Empty = ({ show }: { show: boolean }) => {
  const { mutateAsync: updateTrack } = useMutateTrackInfo();

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='flex-center w-full max-w-max flex-col gap-y-2 overflow-hidden p-4'
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
      )}
    </AnimatePresence>
  );
};
export default Empty;
