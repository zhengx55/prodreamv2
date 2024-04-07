import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { plag_report_type } from '@/constant';
import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { memo, useCallback, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { useLocalStorage, useUnmount } from 'react-use';
import Title from '../Title';
import NoPlagiarismReport from './NoPlagiarismReport';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
const Report = dynamic(() => import('./Report'));

export type PdfResult = {
  prob: number;
  link: string;
  score: string;
  results: string;
  total_words: string;
};

type Props = { t: EditorDictType };
const Plagiarism = ({ t }: Props) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const { id } = useParams();
  const [showLoading, setShowLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [pdfResult, setPdfResult, remove] = useLocalStorage<PdfResult>(
    `plag_report_${id}`,
    undefined
  );
  const { mutateAsync: plagiarism } = useMutation({
    mutationFn: (params: string) => plagiarismCheck(params),
    onMutate: () => {
      setProgress(0);
      setShowLoading(true);
    },
    onSuccess: (data) => {
      setProgress((prev) => prev + 10);
      timer.current = setInterval(async () => {
        const res = await plagiarismQuery(data as string);
        setProgress((prev) => prev + 2);
        if (res.status === 'done') {
          setProgress(100);
          setShowLoading(false);
          let updates: PdfResult = {
            prob: -1,
            link: '',
            score: '',
            results: '',
            total_words: '',
          };
          updates.prob = res.scores;
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
                updates.total_words = (textContent.items[index + 2] as any).str;
              }
            }
          });
          setPdfResult(updates);
          clearInterval(timer.current!);
        }
      }, 5000);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
      setShowLoading(false);
    },
  });

  useUnmount(() => {
    timer.current && clearInterval(timer.current);
  });

  const abortRequest = useCallback(() => {
    setShowLoading(false);
    timer.current && clearInterval(timer.current);
    setProgress(0);
  }, []);

  const handlePlagiarismCheck = useCallback(async () => {
    if (pdfResult) {
      remove();
    }
    let editor_text: string | undefined;
    const title = editor?.getJSON().content?.at(0)?.content?.at(0)?.text;
    editor_text = editor?.getText()?.replace(title!, '').trimStart();
    if (!editor_text) {
      const toast = (await import('sonner')).toast;
      toast.error('Please write something to check plagiarism');
      return;
    }
    await plagiarism(editor_text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      <Title t={t} showRecheck recheck={handlePlagiarismCheck} />
      <AnimatePresence mode='wait'>
        {showLoading ? (
          <Waiting progress={progress} onAbort={abortRequest} />
        ) : pdfResult ? (
          pdfResult.prob === 0 ? (
            <NoPlagiarismReport t={t} />
          ) : (
            <Report t={t} report={pdfResult} />
          )
        ) : (
          <Starter t={t} start={handlePlagiarismCheck} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Waiting = ({
  progress,
  onAbort,
}: {
  progress: number;
  onAbort: () => void;
}) => {
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
        Generating plagiarism check report May take up to 5 minutes, thank you
        for waiting
      </p>
      <Button
        onClick={onAbort}
        role='button'
        variant={'ghost'}
        className='w-max self-end rounded-lg border border-neutral-400 text-zinc-500'
      >
        Cancel
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
}) => (
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
      {t.Plagiarism.Title} <br />
      {t.Plagiarism.Waiting}
    </p>

    <Button
      className='base-regular h-max w-max self-center rounded-full bg-violet-500 px-20'
      role='button'
      onClick={start}
    >
      {t.Plagiarism.Button}
    </Button>
  </m.div>
);

export default memo(Plagiarism);
