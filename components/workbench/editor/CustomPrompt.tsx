import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, KeyboardEvent, forwardRef, memo, useState } from 'react';

type Props = { submit: () => void; currentResult: number };
const CustomPrompt = forwardRef<HTMLInputElement, Props>(
  ({ submit, currentResult }, ref) => {
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
      <div className='flex-between h-11 w-full gap-x-2 rounded-lg border border-indigo-500 bg-white p-2 shadow-lg'>
        <Icon
          alt=''
          src='/editor/copilot.svg'
          width={24}
          height={24}
          className='size-5'
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
              ? 'Instruct AI on edits or generation...'
              : 'Instruct AI on further actions...'
          }
        />
        <Button
          onClick={submit}
          disabled={!isTyping}
          className='fopnt-semibold h-7 rounded'
        >
          Enter
        </Button>
      </div>
    );
  }
);
CustomPrompt.displayName = 'CustomPrompt';
export default memo(CustomPrompt);
