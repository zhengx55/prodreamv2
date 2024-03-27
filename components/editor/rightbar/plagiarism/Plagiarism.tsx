import { Button } from '@/components/ui/button';
import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import { IPlagiarismData } from '@/query/type';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { AnimatePresence, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useCallback, useRef, useState } from 'react';

const Report = dynamic(() => import('./Report'));
const WaitingModal = dynamic(() => import('./WaitingModal'));

type Props = { t: EditorDictType };
const Plagiarism = ({ t }: Props) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const [showLoading, setShowLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<
    Omit<IPlagiarismData, 'status'> | undefined
  >({
    scores: 1.0,
    spans: [
      [398, 542],
      [543, 634],
      [635, 787],
    ],
  });

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
          setResult({ scores: res.scores, spans: res.spans });
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
    if (result) {
      setResult(undefined);
    }
    if (!editor?.getText()) {
      const toast = (await import('sonner')).toast;
      toast.error('Please write something to check plagiarism');
      return;
    }
    await plagiarism(editor?.getText());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      {showLoading && (
        <WaitingModal progress={progress} onAbort={abortRequest} />
      )}
      <AnimatePresence mode='wait'>
        {result ? (
          <Report t={t} report={result} recheck={handlePlagiarismCheck} />
        ) : (
          <Starter t={t} start={handlePlagiarismCheck} />
        )}
      </AnimatePresence>
    </div>
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
