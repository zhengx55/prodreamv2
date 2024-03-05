import { Button } from '@/components/ui/button';
import { submitPolish } from '@/query/api';
import {
  useMembershipInfo,
  useMutateTrackInfo,
  useUserTrackInfo,
} from '@/query/query';
import { IGrammarResponse, IGrammarResult } from '@/query/type';
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { JSONContent } from '@tiptap/react';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useState } from 'react';

const Result = dynamic(() => import('./Result'));

export const GrammarCheck = memo(() => {
  const [isChecking, setIsChecking] = useState(false);
  const editor = useAIEditor((state) => state.editor_instance);
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { data: userTrack } = useUserTrackInfo();
  const { data: usage } = useMembershipInfo();
  const grammarResults = useAIEditor((state) => state.grammarResults);
  const updateGrammarResult = useAIEditor((state) => state.updateGrammarResult);
  const queryClient = useQueryClient();
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);

  const { mutateAsync: handleGrammarCheck } = useMutation({
    mutationFn: (params: { block: JSONContent[] }) => submitPolish(params),
    onMutate: () => {
      setIsChecking(true);
    },
    onSuccess: (data: IGrammarResponse[]) => {
      if (usage?.subscription === 'basic')
        queryClient.invalidateQueries({ queryKey: ['membership'] });
      let grammar_result: IGrammarResult[] = [];
      grammar_result = data.map((item) => {
        return {
          index: item.index,
          diff: item.diff
            .map((diffSection) => ({
              expand: false,
              data: diffSection,
            }))
            .filter((diffSection) =>
              diffSection.data.some((diffItem) => diffItem.status !== 0)
            ),
        };
      });
      updateGrammarResult(grammar_result);
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
    if (!userTrack?.grammar_task) {
      await updateTrack({
        field: 'grammar_task',
        data: 'true',
      });
    }
    if (editor?.getText().trim() === '') {
      const toast = (await import('sonner')).toast;
      toast.error('No text found!');
      return;
    }
    const block_content = editor?.getJSON();
    const params = {
      block: block_content?.content?.slice(1) || [], // Ensure block is not undefined
    };
    await handleGrammarCheck(params);
  };
  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
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
          <Result grammarResults={grammarResults} />
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
              priority
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
      {usage?.subscription === 'basic' ? (
        <div className='mt-auto flex flex-col gap-y-0.5'>
          <div className='relative h-2 w-full rounded-xl bg-border-50'>
            {usage.free_times_detail.Generate === 0 ? (
              <span className='absolute inset-0 rounded-xl bg-red-400' />
            ) : (
              <span
                className='absolute inset-0 w-full rounded-xl bg-doc-primary'
                style={{
                  width: `${((100 - (usage?.free_times_detail.Grammar ?? 0)) / 100) * 100}%`,
                }}
              />
            )}
          </div>
          <p className='small-regular w-max px-0 text-doc-font'>
            {usage?.free_times_detail.Grammar}/100 weekly Grammar Checks left;
            <Button
              role='dialog'
              onClick={() => {
                updatePaymentModal(true);
              }}
              variant={'ghost'}
              className='px-2'
            >
              Go unlimited
            </Button>
          </p>
        </div>
      ) : null}
    </div>
  );
});

GrammarCheck.displayName = 'GrammarCheck';
