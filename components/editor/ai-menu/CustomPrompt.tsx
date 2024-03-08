import { Copilot } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, KeyboardEvent, forwardRef, memo, useState } from 'react';

type Props = { submit: () => void };
const CustomPrompt = forwardRef<HTMLInputElement, Props>(({ submit }, ref) => {
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
    <div className='flex-between h-12 w-full gap-x-2 rounded-t border border-shadow-border bg-white p-2 shadow-lg'>
      <Copilot size='24' />
      <Input
        type='text'
        ref={ref}
        onChange={handlePromptChange}
        onKeyDown={handleKeyEnter}
        id='ai-prompt'
        className='small-regular h-8 border-none px-0 py-0 shadow-none focus-visible:right-0 focus-visible:ring-0'
        placeholder='Ask Al to edit or generate...'
      />
      <Button
        onClick={submit}
        disabled={!isTyping}
        className='h-7 rounded bg-doc-primary disabled:bg-doc-shadow'
      >
        Enter
      </Button>
    </div>
  );
});
CustomPrompt.displayName = 'CustomPrompt';
export default memo(CustomPrompt);
