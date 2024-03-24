import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { getDetectionResult } from '@/query/api';
import { useMembershipInfo } from '@/query/query';
import { IDetectionResult } from '@/query/type';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import Result from './Result';

const Detection = () => {
  const { data: membership } = useMembershipInfo();
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<IDetectionResult>();
  const editor = useAIEditor((state) => state.editor_instance);
  const { mutateAsync: detection } = useMutation({
    mutationFn: (params: { text: string }) => getDetectionResult(params),
    onSuccess: async (data) => {
      console.log(data);
    },
    onMutate: () => {
      setGenerating(true);
    },
    onError: async () => {},
    onSettled: () => {
      setGenerating(false);
    },
  });

  const startDetection = useCallback(async () => {
    const editor_text = editor?.getText();
    const { toast } = await import('sonner');
    if (!editor_text) {
      toast.error('Please write something first');
      return;
    }
    await detection({ text: editor_text });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <AnimatePresence mode='wait'>
      {!result ? (
        <Result />
      ) : generating ? (
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          key={'break-down generating'}
          exit={{ opacity: 0, y: -20 }}
          className='flex-center flex-1'
        >
          <Loader2 className='animate-spin text-doc-shadow' />
        </m.div>
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
        onClick={start}
      >
        Start Humanize
      </Button>
    </m.div>
  );
});

Starter.displayName = 'Starter';

export default memo(Detection);
