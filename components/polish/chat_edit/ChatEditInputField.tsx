import { Send, SendActive } from '@/components/root/SvgComponents';
import { IPolishParams } from '@/query/type';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ChangeEvent, KeyboardEvent, memo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from '../../ui/textarea';

const ChatEditInputField = ({
  handleSubmit,
  selectedText,
}: {
  selectedText: string;
  handleSubmit: UseMutateAsyncFunction<any, Error, IPolishParams, void>;
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!ref.current) return;
    const textarea = e.target;
    // textarea 会留有换行符
    if (textarea.value === '\n') {
      textarea.value = '';
    }
    ref.current.style.height = 'auto';
    ref.current.style.height = `${textarea.scrollHeight}px`;
    setCustomPrompt(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePolish();
    }
  };

  const handlePolish = async () => {
    if (!selectedText) {
      toast.error('no content selected');
      return;
    }
    if (!customPrompt.trim()) {
      toast.error('no input detected');
      return;
    }
    await handleSubmit({
      instruction: customPrompt.trim(),
      text: selectedText,
    });
    setCustomPrompt('');
  };
  return (
    <div className='relative w-full py-2'>
      <Textarea
        onKeyDown={handleKeyPress}
        ref={ref}
        id='prompt'
        value={customPrompt}
        onChange={handleInputChange}
        aria-label='prompt'
        rows={1}
        className='base-regular min-h-14 max-h-[100px] w-full overflow-hidden rounded-xl py-4 pl-4 pr-14 shadow-md focus-visible:ring-0'
        placeholder='Tell us to ...'
      />
      {customPrompt.trim() === '' ? (
        <span className='flex-center absolute bottom-[18px] right-3 h-8 w-8 rounded-lg bg-shadow-border'>
          <Send />
        </span>
      ) : (
        <span
          onClick={handlePolish}
          className='flex-center absolute bottom-[18px] right-3 h-8 w-8 cursor-pointer rounded-lg bg-primary-200 hover:brightness-125'
        >
          <SendActive />
        </span>
      )}
    </div>
  );
};

export default memo(ChatEditInputField);
