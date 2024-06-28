'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { saveDoc } from '@/query/api';
import { useAIEditor } from '@/zustand/store';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Route } from 'next';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useReducer, useState } from 'react';
interface State {
  content: string;
  wordCount: number;
}

type Action = { type: 'updateContent'; payload: string };

const initialState: State = {
  content: '',
  wordCount: 0,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'updateContent':
      return {
        ...state,
        content: action.payload,
        wordCount: action.payload.trim().split(/\s+/).length,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const PromptView = ({ show }: { show: boolean }) => {
  const [{ content, wordCount }, dispatch] = useReducer(reducer, {
    ...initialState,
    content: '',
    wordCount: 0,
  });
  const { id } = useParams();
  const tEditor = useTranslations('Editor');
  const router = useRouter();
  const pathName = usePathname();
  const { mutateAsync: savePrompt, isPending } = useMutation({
    mutationFn: (params: { brief_description: string; id: string }) =>
      saveDoc(params),
    onError: async () => {
      const { toast } = await import('sonner');
      toast.error(
        tEditor('Prompt.Something_went_wrong_when_setting_essay_prompt')
      );
    },
    onSuccess: async (_data, variables) => {
      const { toast } = await import('sonner');
      updateEssayPrompt(variables.brief_description);
      const toastInfo = tEditor('Prompt.Successfully_set_essay_prompt');
      toast.success(toastInfo);
    },
  });

  const updateEssayPrompt = useAIEditor((state) => state.updateEssayPrompt);
  const onChangHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'updateContent', payload: e.target.value });
  };
  const [openPrompt, setOpenPrompt] = useState(show);
  const handleSavePrompt = async () => {
    if (!content) {
      setOpenPrompt(false);
      removeSearchParams();
      return;
    }
    await savePrompt({ id: id as string, brief_description: content });
    setOpenPrompt(false);
  };

  const removeSearchParams = () => {
    router.replace(pathName as Route);
  };

  return (
    <Dialog open={openPrompt} onOpenChange={setOpenPrompt}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='shrink-0 bg-white shadow-md sm:max-w-[800px] md:rounded-lg'
      >
        <DialogHeader>
          <DialogTitle className='text-2xl font-medium leading-[160%] '>
            {tEditor('Prompt.Title')}
          </DialogTitle>
          <DialogDescription className='h-[25px] w-[579px] text-sm font-normal leading-[160%] text-zinc-500 '>
            {tEditor('Prompt.PlaceHolder')}
          </DialogDescription>
          <DialogClose
            onClick={removeSearchParams}
            className='absolute right-1 top-1 m-2 text-gray-400 hover:text-gray-500'
          >
            <XCircle className='h-6 w-6 shrink-0' />
          </DialogClose>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={onChangHandler}
          disabled={isPending}
          aria-label='essay prompt'
          id='essay-prompt'
          className='h-[107px] w-full rounded border border-solid border-gray-200 bg-white '
          placeholder={tEditor(
            'Prompt.An_argumentative_essay_discussing_challenges_and_strategies_of_conserving_biodiversity_in_the_Amazon_rainforest'
          )}
        />
        <DialogFooter className='sm:justify-between'>
          <div className='flex items-center'>
            <p className='base-regular'>{tEditor('Prompt.Strength')} :</p>
            &nbsp;&nbsp;
            <div className='flex items-center gap-x-0.5'>
              {wordCount < 5 ? (
                <span className='h-2 w-20 rounded-[41px] bg-slate-200' />
              ) : (
                <span className='h-2 w-20 rounded-[41px] bg-orange-300' />
              )}
              {wordCount < 10 ? (
                <span className='h-2 w-20 rounded-[41px] bg-slate-200' />
              ) : (
                <span className='h-2 w-20 rounded-[41px] bg-orange-400' />
              )}
              {wordCount < 20 ? (
                <span className='h-2 w-20 rounded-[41px] bg-slate-200' />
              ) : (
                <span className='h-2 w-20 rounded-[41px] bg-orange-500' />
              )}
            </div>
          </div>
          <Button
            onClick={handleSavePrompt}
            disabled={isPending}
            className='w-99 inline-flex h-8 items-center gap-2.5 rounded bg-purple-700 px-4 py-2 text-white'
          >
            {tEditor('Prompt.Start_Writing')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptView;
