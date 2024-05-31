import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { plag_report_type } from '@/constant';
import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import { EditorDictType, PdfResult } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { pdfjs } from 'react-pdf';
import Title from '../Title';
import NoPlagiarismReport from './NoPlagiarismReport';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
const Report = dynamic(() => import('./Report'));

type Props = { t: EditorDictType };
const Plagiarism = ({ t }: Props) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const plagiarismLoading = useAIEditor((state) => state.plagiarismLoading);
  const plagiarismProgress = useAIEditor((state) => state.plagiarismProgress);
  const plagiarismResult = useAIEditor((state) => state.plagiarismResult);
  const trans = useTranslations('Editor');

  const updatePlagiarismResult = useAIEditor(
    (state) => state.updatePlagiarismResult
  );
  const updatePlagiarismLoading = useAIEditor(
    (state) => state.updatePlagiarismLoading
  );
  const updatePlagiarismProgress = useAIEditor(
    (state) => state.updatePlagiarismProgress
  );
  const startPlagiarismTimer = useAIEditor(
    (state) => state.startPlagiarismTimer
  );
  const incrementPlagiarismProgress = useAIEditor(
    (state) => state.incrementPlagiarismProgress
  );
  const stopPlagiarismTimer = useAIEditor((state) => state.stopPlagiarismTimer);
  const { mutateAsync: plagiarism } = useMutation({
    mutationFn: (params: string) => plagiarismCheck(params),
    onMutate: () => {
      updatePlagiarismProgress(0);
      if (plagiarismResult) updatePlagiarismResult(undefined);
      updatePlagiarismLoading(true);
    },
    onSuccess: (data) => {
      incrementPlagiarismProgress(10);
      let timer = setInterval(async () => {
        const res = await plagiarismQuery(data as string);
        incrementPlagiarismProgress(2);
        if (res.status === 'done') {
          let updates: PdfResult = {
            prob: -1,
            link: '',
            score: '',
            results: '',
            total_words: '',
          };
          updates.prob = res.scores;
          if (res.pdf) {
            updates.link = res.pdf;
            const loadingTask = pdfjs.getDocument(res.pdf);
            const pdfpage = await loadingTask.promise;
            const page = await pdfpage.getPage(1);
            const textContent = await page.getTextContent();
            textContent.items.forEach((item, index) => {
              if ('str' in item && plag_report_type.includes(item.str)) {
                if (item.str === plag_report_type[0]) {
                  updates.score = (textContent.items[index + 2] as any).str;
                } else if (item.str === plag_report_type[1]) {
                  updates.results = (textContent.items[index + 2] as any).str;
                } else {
                  updates.total_words = (
                    textContent.items[index + 2] as any
                  ).str;
                }
              }
            });
          }
          updatePlagiarismResult(updates);
          updatePlagiarismProgress(100);
          stopPlagiarismTimer();
          updatePlagiarismLoading(false);
        }
      }, 5000);
      startPlagiarismTimer(timer);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
      updatePlagiarismLoading(false);
    },
  });

  const handlePlagiarismCheck = useCallback(async () => {
    let editor_text: string | undefined;
    const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
    editor_text = editor?.getText()?.replace(title!, '').trimStart();
    if (!editor_text) {
      const toast = (await import('sonner')).toast;
      toast.error(trans('Plagiarism.ErrorToast'));
      return;
    }
    await plagiarism(editor_text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      <Title
        showRecheck={!!plagiarismResult}
        recheck={handlePlagiarismCheck}
      />
      <AnimatePresence mode='wait'>
        {plagiarismLoading ? (
          <Waiting progress={plagiarismProgress} />
        ) : plagiarismResult ? (
          plagiarismResult.prob === 0 ? (
            <NoPlagiarismReport t={t} />
          ) : (
            <Report t={t} report={plagiarismResult} />
          )
        ) : (
          <Starter t={t} start={handlePlagiarismCheck} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Waiting = ({ progress }: { progress: number }) => {
  const trans = useTranslations('Editor');
  const updatePlagiarismLoading = useAIEditor(
    (state) => state.updatePlagiarismLoading
  );
  const updatePlagiarismProgress = useAIEditor(
    (state) => state.updatePlagiarismProgress
  );

  const stopPlagiarismTimer = useAIEditor((state) => state.stopPlagiarismTimer);
  const abortRequest = () => {
    updatePlagiarismLoading(false);
    stopPlagiarismTimer();
    updatePlagiarismProgress(0);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'plagiarism-waiting'}
      className='flex w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 p-4'
    >
      <div className='flex-center'>
        <Image
          alt='waiting'
          src='/editor/Loading.png'
          width={180}
          height={180}
          className='size-44 self-center'
        />
      </div>
      <Progress value={progress} />
      <p className='text-center text-sm font-light text-neutral-400'>
        {trans('Plagiarism.Generating_plagiarism_check_report')}
      </p>
      <Button
        onClick={abortRequest}
        role='button'
        variant={'ghost'}
        className='w-max self-end rounded-lg border border-neutral-400 text-zinc-500'
      >
        {trans('Plagiarism.Cancel')}
      </Button>
    </m.div>
  );
};

const Starter = ({
  start,
  t,
}: {
  start: () => Promise<void>;
  t: EditorDictType;
}) => {
  const trans = useTranslations('Editor');
  return (
  <m.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    key={'plagiarism-check'}
    className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'
  >
    <Image
      src='/editor/Plaglarism.png'
      alt='plagiarism check'
      width={180}
      height={180}
      className='size-44 self-center'
      priority
    />
    <p className='text-center text-sm font-normal text-zinc-600'>
      {trans('Plagiarism.Title')}
    </p>

    <Button
      className='base-medium h-max w-max self-center rounded-lg px-8'
      role='button'
      onClick={start}
    >
      {trans('Plagiarism.Button')}
    </Button>
    </m.div>
  );
};

export default memo(Plagiarism);
