import { Button } from '@/components/ui/button';
import { submitPolish } from '@/query/api';
import { IPolishResultAData } from '@/query/type';
import useAiEditor from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';

const Result = dynamic(() => import('./Result'));

export const GrammarCheck = memo(() => {
  const [isChecking, setIsChecking] = useState(false);
  const editor = useAiEditor((state) => state.editor_instance);
  const deactivateSaving = useAiEditor((state) => state.deactivateSaving);
  const [grammarResults, setGrammarResults] = useState<IPolishResultAData[]>(
    []
  );

  const memoUpdateResult = useCallback((value: IPolishResultAData[]) => {
    setGrammarResults(value);
  }, []);
  const { mutateAsync: handleGrammarCheck } = useMutation({
    mutationFn: (params: { text: string }) => submitPolish(params),
    onMutate: () => {
      setIsChecking(true);
    },
    onSuccess: (data: IPolishResultAData[]) => {
      if (data.length > 0) {
        data.map((item, index) =>
          index === 0 ? (item.expand = true) : (item.expand = false)
        );
      }
      console.log(data);
      setGrammarResults(data);
      deactivateSaving();
    },
    onSettled: () => {
      setIsChecking(false);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
  const handleCheck = async () => {
    if (editor?.getText().trim() === '') {
      const toast = (await import('sonner')).toast;
      toast.error('No text found!');
      return;
    }

    await handleGrammarCheck({
      text: editor?.getText({
        blockSeparator: '\n\n',
      })!,
    });
  };
  return (
    <div className='flex w-full flex-1 overflow-hidden'>
      <AnimatePresence mode='wait'>
        {isChecking ? (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            key={'isChecking'}
            exit={{ opacity: 0, y: -20 }}
            className='flex-center flex-1'
          >
            <Loader2 className='animate-spin text-doc-shadow' />
          </m.div>
        ) : grammarResults.length > 0 ? (
          <Result
            grammarResults={grammarResults}
            updateGrammarResult={memoUpdateResult}
          />
        ) : (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key={'grammer-check'}
            className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-shadow-border px-4 py-4'
          >
            <Image
              src='/Grammar.png'
              alt='grammar check'
              width={450}
              height={270}
              className='h-auto w-auto'
            />
            <Button
              className='base-regular h-max w-max self-center rounded-full bg-doc-primary px-20'
              role='button'
              onClick={handleCheck}
            >
              Start Grammar Check
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
});

GrammarCheck.displayName = 'GrammarCheck';
