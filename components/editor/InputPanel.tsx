'use client';

import { FormEvent, useState } from 'react';

type Props = {};

const InputPanel = (props: Props) => {
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
    <div className='h-full w-1/2 p-3'>
      <div className='flex h-full flex-col rounded-lg bg-white py-6 pl-6 pr-4'>
        <section
          onInput={handleInput}
          className='custom-scrollbar h-full w-full overflow-auto text-justify outline-none'
          placeholder='Write your message..'
          contentEditable
        />

        <div className='flex'>{wordCount}</div>
      </div>
    </div>
  );
};

export default InputPanel;
