import { Button } from '@/components/ui/button';
import useButtonTrack from '@/hooks/useBtnTrack';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { highLightGrammar } from '@/lib/tiptap/utils';
import { submitPolish } from '@/query/api';
import { IGrammarResponse, IGrammarResult } from '@/query/type';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { JSONContent } from '@tiptap/react';
import { AnimatePresence, m } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import Title from '../Title';

const Result = dynamic(() => import('./Result'));

export const GrammarCheck = ({ t }: { t: EditorDictType }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [grammarResults, setGrammarResults] = useState<IGrammarResult[]>([]);
  const editor = useAIEditor((state) => state.editor_instance);
  const { data: usage } = useMembershipInfo();
  const queryClient = useQueryClient();
  const transEditor = useTranslations('Editor');
  const updatePaymentModal = useAIEditor((state) => state.updatePaymentModal);
  const { mutateAsync: ButtonTrack } = useButtonTrack();
  const updateGrammarResult = useCallback((value: IGrammarResult[]) => {
    setGrammarResults(value);
  }, []);

  const { mutateAsync: handleGrammarCheck } = useMutation({
    mutationFn: (params: { block: JSONContent[] }) => submitPolish(params),
    onMutate: () => {
      setIsChecking(true);
    },
    onSuccess: async (data: IGrammarResponse[]) => {
      if (usage?.subscription === 'basic')
        queryClient.invalidateQueries({ queryKey: ['membership'] });
      let grammar_result: IGrammarResult[] = [];
      if (data.length === 0) {
        const toast = (await import('sonner')).toast;
        const toastInfo = transEditor(
          'CustomCitation.GrammarCheck.No_grammar_issues_found'
        );
        return toast.success(toastInfo);
      }
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
      // Expand and underline the first suggestion
      const expand_head_array = [...grammar_result];
      expand_head_array[0].diff[0].expand = true;
      highLightGrammar(editor!, expand_head_array[0], 0);
      updateGrammarResult(expand_head_array);
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
      const toastInfo = transEditor(
        'CustomCitation.GrammarCheck.No_text_found'
      );
      toast.error(toastInfo);
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
      <Title />
      <AnimatePresence mode='wait'>
        {isChecking ? (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            key={'isChecking'}
            exit={{ opacity: 0, y: -20 }}
            className='flex-center flex-1'
          >
            <Loader2 className='animate-spin text-zinc-600' />
          </m.div>
        ) : grammarResults.length > 0 ? (
          <Result
            t={t}
            update={updateGrammarResult}
            grammarResults={grammarResults}
          />
        ) : (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key={'grammer-check'}
            className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'
          >
            <Image
              src='/editor/Start.png'
              alt={transEditor('Grammar.Title')}
              width={450}
              height={270}
              className='h-44 w-60 self-center'
              priority
            />
            <p className='text-center text-sm font-normal text-zinc-600'>
              {transEditor('Grammar.Title')}
            </p>
            <Button
              className='base-medium h-max w-max self-center rounded-lg px-8'
              role='button'
              onClick={handleCheck}
            >
              {transEditor('Grammar.Button')}
            </Button>
          </m.div>
        )}
      </AnimatePresence>
      {usage?.subscription === 'basic' ? (
        <div className='mt-auto flex flex-col gap-y-0.5'>
          <div className='relative h-2 w-full rounded-xl bg-gray-200'>
            {usage.free_times_detail.Generate === 0 ? (
              <span className='absolute inset-0 rounded-xl bg-red-400' />
            ) : (
              <span
                className='absolute inset-0 w-full rounded-xl bg-violet-500'
                style={{
                  width: `${((100 - (usage?.free_times_detail.Grammar ?? 0)) / 100) * 100}%`,
                }}
              />
            )}
          </div>
          <p className='small-regular w-max px-0 text-neutral-400'>
            {transEditor('Grammar.GrammarCheckLeft', {
              left: usage?.free_times_detail?.Grammar
                ? 100 - usage?.free_times_detail?.Grammar
                : 0,
            })}
            <Button
              role='dialog'
              onClick={async () => {
                await ButtonTrack({
                  event: 'open payment at grammar check',
                });
                updatePaymentModal(true);
              }}
              variant={'ghost'}
              className='px-2'
            >
              {transEditor('Grammar.Go_unlimited')}
            </Button>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default memo(GrammarCheck);
