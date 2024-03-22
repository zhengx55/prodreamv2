import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { getDetectionResult } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { memo, useCallback } from 'react';
import Unlock from '../Unlock';

const Detection = () => {
  const { data: membership } = useMembershipInfo();
  const { mutateAsync: detection } = useMutation({
    mutationFn: (params: { text: string }) => getDetectionResult(params),
    onSuccess: async () => {},
    onMutate: () => {},
    onError: async () => {},
    onSettled: () => {},
  });
  const startDetection = useCallback(async () => {
    await detection({ text: 'text' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AnimatePresence mode='wait'>
      {membership?.subscription !== 'basic' ? (
        <Unlock text={'Unlock Humanizer with the Unlimited Plan'} />
      ) : (
        <Starter start={startDetection} />
      )}
    </AnimatePresence>
  );
};

const Starter = memo(({ start }: { start: () => Promise<void> }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'detection-check'}
      className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'
    >
      <h3 className='text-black text-sm font-medium'>Humanizer</h3>
      <Spacer y='16' />
      <Image
        src='/editor/Start.png'
        alt='Upgrade check'
        width={450}
        height={270}
        className='h-44 w-60 self-center'
        priority
      />
      <p className='text-center text-sm font-normal text-zinc-600'>
        Click to see humanize suggestions
      </p>
      <Button
        className='base-regular h-max w-max self-center rounded-full bg-doc-primary px-20'
        role='button'
      >
        Start Humanize
      </Button>
    </m.div>
  );
});

Starter.displayName = 'Starter';

export default memo(Detection);
