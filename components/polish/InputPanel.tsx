'use client';

import { FormEvent, useState } from 'react';

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
    <div className='overflow-hidden md:h-full md:w-1/2 md:p-4'>
      <div className='flex h-full w-full flex-col rounded-lg bg-white py-6 pl-6 pr-4'>
        <section
          onInput={handleInput}
          className='custom-scrollbar h-full w-full overflow-y-auto text-justify outline-none'
          placeholder='Write your message..'
          contentEditable
        />
        <div className='flex'>{wordCount}</div>
      </div>
    </div>
  );
};

export default InputPanel;
