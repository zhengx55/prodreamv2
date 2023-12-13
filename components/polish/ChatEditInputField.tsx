import React, {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useRef,
  useState,
} from 'react';
import { Textarea } from '../ui/textarea';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { IPolishParams } from '@/query/type';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import { useToast } from '../ui/use-toast';

const ChatEditInputField = ({
  handleSubmit,
}: {
  handleSubmit: UseMutateAsyncFunction<any, Error, IPolishParams, void>;
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const { selectText } = useAiEditiorContext();
  const { toast } = useToast();

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
    if (!selectText) {
      toast({
        variant: 'destructive',
        description: 'no content selected',
      });
      return;
    }
    if (!customPrompt.trim()) {
      toast({
        variant: 'destructive',
        description: 'no input detected',
      });
      return;
    }
    await handleSubmit({ instruction: customPrompt.trim(), text: selectText });
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
        className='base-regular min-h-14 max-h-[100px] w-full overflow-hidden py-4 pl-4 pr-14 shadow-md focus-visible:ring-0'
        placeholder='Tell us to ...'
      />
      {customPrompt.trim() === '' ? (
        <span className='flex-center absolute bottom-[18px] right-3 h-8 w-8 rounded-lg bg-shadow-border'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M19.3037 3.03392C18.8307 2.98792 18.2817 3.06692 17.6787 3.31492C17.6787 3.31492 4.96373 8.55291 4.55373 8.72191C3.54273 9.11491 2.99072 9.54292 2.99072 10.5339V10.6589C2.99072 11.6689 3.80873 12.3649 4.77173 12.5029L10.1787 13.8149L11.4597 19.1909C11.5827 20.1729 12.3097 21.0029 13.3347 21.0029H13.4597C14.4507 21.0029 14.8717 20.4379 15.2717 19.4089L20.6787 6.31493C21.4237 4.50493 20.7197 3.17292 19.3037 3.03392ZM18.9907 5.00291C19.0317 5.04391 18.9927 5.18093 18.8347 5.56493L13.4287 18.6909C13.4197 18.7129 13.4047 18.7019 13.3967 18.7219L11.9597 12.7529C11.8717 12.3889 11.6047 12.1219 11.2407 12.0339L5.30373 10.5969C5.73173 10.4209 18.4287 5.15892 18.4287 5.15892C18.8127 5.00092 18.9497 4.96191 18.9907 5.00291Z'
              fill='#9C9C9C'
            />
          </svg>
        </span>
      ) : (
        <span
          onClick={handlePolish}
          className='flex-center absolute bottom-[18px] right-3 h-8 w-8 cursor-pointer rounded-lg bg-primary-200 hover:brightness-125'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M19.3037 3.03392C18.8307 2.98792 18.2817 3.06692 17.6787 3.31492C17.6787 3.31492 4.96373 8.55291 4.55373 8.72191C3.54273 9.11491 2.99072 9.54292 2.99072 10.5339V10.6589C2.99072 11.6689 3.80873 12.3649 4.77173 12.5029L10.1787 13.8149L11.4597 19.1909C11.5827 20.1729 12.3097 21.0029 13.3347 21.0029H13.4597C14.4507 21.0029 14.8717 20.4379 15.2717 19.4089L20.6787 6.31493C21.4237 4.50493 20.7197 3.17292 19.3037 3.03392ZM18.9907 5.00291C19.0317 5.04391 18.9927 5.18093 18.8347 5.56493L13.4287 18.6909C13.4197 18.7129 13.4047 18.7019 13.3967 18.7219L11.9597 12.7529C11.8717 12.3889 11.6047 12.1219 11.2407 12.0339L5.30373 10.5969C5.73173 10.4209 18.4287 5.15892 18.4287 5.15892C18.8127 5.00092 18.9497 4.96191 18.9907 5.00291Z'
              fill='white'
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default memo(ChatEditInputField);
