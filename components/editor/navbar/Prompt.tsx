import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { PopoverClose, PopoverContent } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { saveDoc } from '@/query/api';
import { useParams } from 'next/navigation';
import { ChangeEvent, memo, useReducer } from 'react';

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
  return (
    <PopoverContent
      align='start'
      sideOffset={15}
      className='h-[260px] w-[800px] shrink-0 rounded-lg border border-solid border-gray-200 bg-white'
    >
      <h1 className='text-2xl font-medium leading-[160%] '>
        Please input your prompt below
      </h1>
      <p className='small-regular text-zinc-500'>
        Adding an essay prompt can greatly enhance the quality of AI generations
      </p>
      <Spacer y='10' />
      <Textarea
        value={content}
        required
        aria-label='essay prompt'
        onChange={onChangHandler}
        className='small-regular h-[107px] w-[760px] shrink-0 rounded border border-gray-200'
        placeholder='e.g.  This essay is about the challenges and strategies of conserving biodiversity in the Anthropocene and discuss the importance of conservation efforts in safeguarding ecosystems and species from the brink of extinction'
      />

      <div className='mt-4 flex items-center justify-between'>
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

        <div className='flex items-center gap-x-2'>
          <PopoverClose asChild>
            <Button
              role='button'
              variant={'ghost'}
              className='border-zin-300 base-regular h-max rounded border px-4 py-2 text-neutral-400'
            >
              Cancel
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              role='button'
              onClick={async () => {
                if (content) {
                  await saveDoc({
                    id: id as string,
                    brief_description: content,
                  });
                }
              }}
              className='base-regular h-max rounded px-4 py-2 '
            >
              Done
            </Button>
          </PopoverClose>
        </div>
      </div>
    </PopoverContent>
  );
};

export default memo(PromptView);
