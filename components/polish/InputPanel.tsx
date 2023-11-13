'use client';

import { FormEvent, useState } from 'react';
import Tooltip from '../root/Tooltip';
import {
  Copy,
  Download,
  Pencil,
  PencilLine,
  Trophy,
  Upload,
} from 'lucide-react';
import { Button } from '../ui/button';

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
    <div className='relative overflow-hidden md:h-full md:w-1/2 md:p-4'>
      <div className='flex h-full w-full flex-col rounded-lg bg-white py-6 pl-6 pr-4'>
        <section
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
          <Tooltip tooltipContent='copy'>
            <div className='tooltip'>
              <Copy size={18} />
            </div>
          </Tooltip>
        </div>
        <div className='flex items-center gap-x-2'>
          <div className='tooltip gap-x-1 hover:bg-primary-50'>
            <PencilLine size={18} />
            <p className='small-semibold'>Chat Edit</p>
          </div>
          <Tooltip tooltipContent='upload essay'>
            <div className='tooltip'>
              <Upload size={18} />
            </div>
          </Tooltip>
          <Tooltip tooltipContent='download essay'>
            <div className='tooltip'>
              <Download size={18} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
