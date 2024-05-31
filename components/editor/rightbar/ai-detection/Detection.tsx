import { Button } from '@/components/ui/button';
import { getDetectionResult } from '@/query/api';
import { IDetectionResult } from '@/query/type';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { JSONContent } from '@tiptap/react';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import Title from '../Title';
const Result = dynamic(() => import('./Result'));

const Detection = () => {
  const t = useTranslations('Editor');
  const [generating, setGenerating] = useState(false);
  const [detectionResult, setDetectionResult] = useState<
    IDetectionResult | undefined
  >();

  const editor = useAIEditor((state) => state.editor_instance);
  const { mutateAsync: detection } = useMutation({
    mutationFn: (params: { text: JSONContent[] }) => getDetectionResult(params),
    onSuccess: async (data) => {
      if (
        data.highlight_sentences.length > 0 &&
        data.highlight_sentences[0][0][0] === 0 &&
        data.highlight_sentences[0][0][1] === 0
      ) {
        const newData = {
          ...data,
          highlight_sentences: data.highlight_sentences.slice(1),
        };
        setDetectionResult(newData);
      } else {
        setDetectionResult(data);
      }
    },
    onMutate: () => {
      if (detectionResult) setDetectionResult(undefined);
      setGenerating(true);
    },
    onError: async () => {
      const { toast } = await import('sonner');
      toast.error(t('Detection.Something_went_wrong_please_try_again_later'));
    },
    onSettled: () => {
      setGenerating(false);
    },
  });

  const startDetection = useCallback(async () => {
    const editor_block = editor?.getJSON().content ?? [];
    let editor_text: string | undefined;
    const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
    editor_text = editor?.getText()?.replace(title!, '').trimStart();
    if (!editor_text) {
      const { toast } = await import('sonner');
      toast.error(t('Detection.Please_write_something_first'));
      return;
    }
    await detection({ text: editor_block });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <>
      <Title showRecheck={!!detectionResult} recheck={startDetection} />
      <AnimatePresence mode='wait'>
        {detectionResult ? (
          <Result result={detectionResult} recheck={startDetection} />
        ) : generating ? (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            key={'break-down generating'}
            exit={{ opacity: 0, y: -20 }}
            className='flex-center flex-1'
          >
            <Loader2 className='animate-spin text-violet-500' />
          </m.div>
        ) : (
          <Starter t={t} start={startDetection} />
        )}
      </AnimatePresence>
    </>
  );
};

const Starter = memo(
  ({ start }: { start: () => Promise<void> }) => {
    const trans = useTranslations('Editor');

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
          {trans('Detection.Title')}
        </p>
        <Button
          className='base-medium h-max w-max self-center rounded-lg px-8'
          role='button'
          onClick={start}
        >
          {trans('Detection.Button')}
        </Button>
      </m.div>
    );
  }
);

Starter.displayName = 'Starter';

export default memo(Detection);
