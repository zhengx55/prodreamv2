import { Button } from '@/components/ui/button';
import { getDetectionResult } from '@/query/api';
import { IDetectionResult } from '@/query/type';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import Result from './Result';

const Detection = ({ t }: { t: EditorDictType }) => {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<IDetectionResult>();
  const editor = useAIEditor((state) => state.editor_instance);
  const { mutateAsync: detection } = useMutation({
    mutationFn: (params: { text: string }) => getDetectionResult(params),
    onSuccess: async (data) => {
      setResult(data);
    },
    onMutate: () => {
      setGenerating(true);
    },
    onError: async () => {
      const { toast } = await import('sonner');
      toast.error('Something went wrong, please try again later');
    },
    onSettled: () => {
      setGenerating(false);
    },
  });

  const startDetection = useCallback(async () => {
    const { toast } = await import('sonner');
    let editor_text: string | undefined;
    const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
    editor_text = editor?.getText()?.replace(title!, '').trimStart();
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
        <Result t={t} result={result} />
      ) : generating ? (
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          key={'break-down generating'}
          exit={{ opacity: 0, y: -20 }}
          className='flex-center flex-1'
        >
          <Loader2 className='animate-spin text-zinc-600' />
        </m.div>
      ) : (
        <Starter t={t} start={startDetection} />
      )}
    </AnimatePresence>
  );
};

const Starter = memo(
  ({ start, t }: { start: () => Promise<void>; t: EditorDictType }) => {
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
          {t.Detection.Title}
        </p>
        <Button
          className='base-regular h-max w-max self-center rounded-full bg-violet-500 px-20'
          role='button'
          onClick={start}
        >
          {t.Detection.Button}
        </Button>
      </m.div>
    );
  }
);

Starter.displayName = 'Starter';

export default memo(Detection);
