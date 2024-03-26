import { Button } from '@/components/ui/button';
import { getDetectionResult } from '@/query/api';
import { IDetectionResult } from '@/query/type';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import Result from './Result';

const Detection = () => {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<IDetectionResult>({
    prob: 1,
    highlight_sentences: [[0, 3768]],
    message: 'Our detector is highly confident that the text is written by AI.',
    class_probabilities: {
      ai: 0.9582642233236245,
      human: 0.025346799969153896,
      mixed: 0.01638897670722151,
    },
  });
  const editor = useAIEditor((state) => state.editor_instance);
  const { mutateAsync: detection } = useMutation({
    mutationFn: (params: { text: string }) => getDetectionResult(params),
    onSuccess: async (data) => {
      setResult(data);
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
      {result ? (
        <Result result={result} />
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
      <Image
        src='/editor/Start.png'
        alt='Upgrade check'
        width={450}
        height={270}
        className='h-44 w-60 self-center'
        priority
      />
      <p className='text-center text-sm font-normal text-zinc-600'>
        Identify AI-generated content and help maintain originality in your work
      </p>
      <Button
        className='base-regular h-max w-max self-center rounded-full bg-doc-primary px-20'
        role='button'
        onClick={start}
      >
        Start AI Detection
      </Button>
    </m.div>
  );
});

Starter.displayName = 'Starter';

export default memo(Detection);
