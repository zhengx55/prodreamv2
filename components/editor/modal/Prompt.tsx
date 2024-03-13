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
import { DialogClose } from '@radix-ui/react-dialog';
import { XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
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
const PromptView = ({ prompt }: { prompt: string }) => {
  const { id } = useParams();
  const [{ content, wordCount }, dispatch] = useReducer(reducer, {
    ...initialState,
    content: prompt,
  });
  const onChangHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'updateContent', payload: e.target.value });
  };
  const [openPrompt, setOpenPrompt] = useState(true);
  const handleSavePrompt = async () => {
    setOpenPrompt(false);
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
            Please input your prompt below
          </DialogTitle>
          <DialogDescription className='h-[25px] w-[579px] text-sm font-normal leading-[160%] text-zinc-500 '>
            Adding an essay prompt can greatly enhance the quality of AI
            generations
          </DialogDescription>
          <DialogClose className='absolute right-1 top-1 m-2 text-gray-400 hover:text-gray-500'>
            <XCircle className='h-6 w-6 shrink-0' />
          </DialogClose>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={onChangHandler}
          aria-label='essay prompt'
          id='essay-prompt'
          className='h-[107px] w-full rounded border border-solid border-gray-200 bg-white '
          placeholder='e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction'
        />
        <DialogFooter className='sm:justify-between'>
          <div className='flex items-center'>
            <p className='base-regular'>Prompt strength :</p>&nbsp;&nbsp;
            <div className='flex items-center gap-x-0.5'>
              {wordCount < 5 ? (
                <span className='h-2 w-20 rounded-[41px] bg-slate-200' />
              ) : (
                <span className='h-2 w-20 rounded-[41px] bg-violet-300' />
              )}
              {wordCount < 10 ? (
                <span className='h-2 w-20 rounded-[41px] bg-slate-200' />
              ) : (
                <span className='h-2 w-20 rounded-[41px] bg-violet-400' />
              )}
              {wordCount < 20 ? (
                <span className='h-2 w-20 rounded-[41px] bg-slate-200' />
              ) : (
                <span className='h-2 w-20 rounded-[41px] bg-violet-500' />
              )}
            </div>
          </div>
          <Button
            onClick={handleSavePrompt}
            className='w-99 inline-flex h-8 items-center gap-2.5 rounded bg-purple-700 px-4 py-2 text-white'
          >
            Start Writing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PromptView;
