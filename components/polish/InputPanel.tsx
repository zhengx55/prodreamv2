'use client';
import { FormEvent, useState } from 'react';
import EditBar from './EditBar';

const InputPanel = () => {
  const [wordCount, setWordCount] = useState(0);
  const handleInput = (e: FormEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent;
    if (text) {
      const words = text
        .replace(/[^a-zA-Z\s]/g, '')
        .split(/\s+/)
        .filter((word) => word !== '');
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  };
  return (
    <div className='relative w-2/3 justify-self-center overflow-hidden'>
      <EditBar />
      <div className='flex h-full w-full flex-col rounded-lg bg-white py-6 pl-6 pr-4'>
        <div
          onInput={handleInput}
          className='custom-scrollbar h-full w-full overflow-y-auto text-justify outline-none'
          placeholder='Write your message..'
          contentEditable
        />
      </div>
      <div className='flex-between absolute bottom-4 left-0 flex h-12 w-full md:px-10'>
        <div className='flex items-center gap-x-2'>
          <div className='tooltip'>
            <p className='small-semibold'>
              {wordCount}
              &nbsp;Words
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
