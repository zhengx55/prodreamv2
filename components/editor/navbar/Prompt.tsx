import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { saveDoc } from '@/query/api';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { PencilLine } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ChangeEvent, memo, useReducer, useRef, useState } from 'react';

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

const PromptView = ({ t }: { t: EditorDictType }) => {
  const prompt = useAIEditor((state) => state.essay_prompt);
  console.log('🚀 ~ PromptView ~ prompt:', prompt);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const updateEssayPrompt = useAIEditor((state) => state.updateEssayPrompt);
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);
  const { mutateAsync: savePrompt } = useMutation({
    mutationFn: (params: { brief_description: string; id: string }) =>
      saveDoc(params),
    onMutate: () => {
      setSaving(true);
    },
    onSettled: () => {
      setSaving(false);
    },
    onError: async () => {
      const { toast } = await import('sonner');
      toast.error(
        'Something went wrong when setting essay prompt, please try again later'
      );
    },
    onSuccess: async (_data, variables) => {
      const { toast } = await import('sonner');
      updateEssayPrompt(variables.brief_description);
      toast.success('Successfully set essay prompt');
    },
  });
  const [{ content, wordCount }, dispatch] = useReducer(reducer, {
    ...initialState,
    content: prompt ?? '',
    wordCount: prompt.trim().split(/\s+/).length,
  });

  const handleSubmit = async () => {
    if (!content) {
      setShow(false);
      return;
    }
    await savePrompt({ id: id as string, brief_description: content });
  };

  const onChangHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'updateContent', payload: e.target.value });
  };
  return (
    <Popover open={show} onOpenChange={setShow}>
      <PopoverTrigger asChild>
        {!prompt ? (
          <Button
            role='dialog'
            className='h-max rounded border border-violet-500 bg-transparent px-2 py-1 hover:bg-slate-100 hover:text-violet-500'
          >
            <PencilLine size={18} className='text-violet-500' />
            <p className='small-regular text-violet-500'>{t.Prompt.Trigger}</p>
          </Button>
        ) : (
          <Button
            role='dialog'
            variant={'ghost'}
            className='h-max rounded border border-gray-200  bg-transparent px-2 py-1  hover:text-violet-500'
          >
            <p className='small-regular text-zinc-700'>{t.Prompt.Strength}</p>
            <div className='flex items-center gap-x-2'>
              {wordCount < 5 ? (
                <span className='h-2 w-2 rounded-full bg-zinc-300' />
              ) : (
                <span className='h-2 w-2 rounded-full bg-orange-300' />
              )}
              {wordCount < 10 ? (
                <span className='h-2 w-2 rounded-full bg-zinc-300' />
              ) : (
                <span className='h-2 w-2 rounded-full bg-orange-400' />
              )}
              {wordCount < 20 ? (
                <span className='h-2 w-2 rounded-full bg-zinc-300' />
              ) : (
                <span className='h-2 w-2 rounded-full bg-orange-500' />
              )}
            </div>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align='end'
        sideOffset={5}
        className='w-[620px] shrink-0 rounded-lg border border-solid border-gray-200 bg-white'
      >
        <div className='flex items-center gap-x-2'>
          <Icon alt='' src='/editor/prompt/Light.svg' width={24} height={24} />
          <h1 className='base-medium '>{t.Prompt.Title}</h1>
        </div>
        <p className='small-regular text-neutral-400'>{t.Prompt.PlaceHolder}</p>
        <Spacer y='10' />
        <Textarea
          value={content}
          id='essay_prompt'
          disabled={saving}
          aria-label='essay prompt'
          onChange={onChangHandler}
          ref={promptRef}
          className='small-regular h-[107px] w-full shrink-0 rounded border border-gray-200'
          placeholder='e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction'
        />

        <div className='mt-4 flex items-center justify-between'>
          <div className='flex items-center'>
            <p className='base-regular text-neutral-400'>
              {t.Prompt.Strength} :
            </p>
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

          <div className='flex items-center gap-x-2'>
            <PopoverClose asChild>
              <Button
                role='button'
                variant={'ghost'}
                className='border-zin-300 base-regular h-max rounded border px-4 py-1 text-neutral-400'
              >
                {t.Utility.Cancel}
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                disabled={saving}
                role='button'
                onClick={handleSubmit}
                className='base-regular h-max rounded px-4 py-1 '
              >
                {t.Utility.Done}
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default memo(PromptView);
