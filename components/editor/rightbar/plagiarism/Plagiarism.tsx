import { Button } from '@/components/ui/button';
import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import { IPlagiarismData } from '@/query/type';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useRef, useState } from 'react';
import Report from './Report';

const Plagiarism = () => {
  const editor = useAIEditor((state) => state.editor_instance);
  const [isGenerating, setIsGenerating] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<
    Omit<IPlagiarismData, 'status'> | undefined
  >();
  const { mutateAsync: plagiarism } = useMutation({
    mutationFn: (params: string) => plagiarismCheck(params),
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: (data) => {
      timer.current = setInterval(async () => {
        const res = await plagiarismQuery(data);
        if (res.status === 'done') {
          setIsGenerating(false);
          setResult({ scores: res.scores, spans: res.spans });
          clearInterval(timer.current!);
        }
      }, 5000);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  useUnmount(() => {
    timer.current && clearInterval(timer.current);
  });

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
      <AnimatePresence mode='wait'>
        {result ? (
          <Report report={result} recheck={handlePlagiarismCheck} />
        ) : isGenerating ? (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            key={'plagiarism generating'}
            exit={{ opacity: 0, y: -20 }}
            className='flex-center flex-1'
          >
            <Loader2 className='animate-spin text-doc-shadow' />
          </m.div>
        ) : (
          <Starter start={handlePlagiarismCheck} />
        )}
      </AnimatePresence>
    </div>
  );
};

const Starter = ({ start }: { start: () => Promise<void> }) => (
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
      Check for originality of your work with deep similarity detection. <br />
      Our extensive database ensures thorough checks, which may take up to 5
      minutes.
    </p>

    <Button
      className='base-regular h-max w-max self-center rounded-full bg-doc-primary px-20'
      role='button'
      onClick={start}
    >
      Start Plaglarism Check
    </Button>
  </m.div>
);

export default memo(Plagiarism);
