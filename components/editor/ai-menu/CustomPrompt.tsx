import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditorDictType } from '@/types';
import { ChangeEvent, KeyboardEvent, forwardRef, memo, useState } from 'react';

type Props = { submit: () => void; t: EditorDictType; currentResult: number };
const CustomPrompt = forwardRef<HTMLInputElement, Props>(
  ({ submit, t, currentResult }, ref) => {
    const [isTyping, setIsTyping] = useState(false);

    const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        submit();
      }
    };
    const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.trim() !== '') {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    };

    return (
      <div className='flex-between h-12 w-full gap-x-2 rounded-t border border-gray-200 bg-white p-2 shadow-lg'>
        <Icon
          alt=''
          src='/editor/stars.svg'
          width={24}
          height={24}
          className='size-[24px]'
        />
        <Input
          type='text'
          ref={ref}
          onChange={handlePromptChange}
          onKeyDown={handleKeyEnter}
          id='ai-prompt'
          className='small-regular h-8 border-none px-0 py-0 shadow-none focus-visible:right-0 focus-visible:ring-0'
          placeholder={
            currentResult === -1
              ? t.Copilot.PlaceHolder_1
              : t.Copilot.PlaceHolder_2
          }
        />
        <Button
          onClick={submit}
          disabled={!isTyping}
          className='h-7 rounded bg-violet-500 disabled:bg-zinc-600'
        >
          {t.Utility.Enter}
        </Button>
      </div>
    );
  }
);
CustomPrompt.displayName = 'CustomPrompt';
export default memo(CustomPrompt);
