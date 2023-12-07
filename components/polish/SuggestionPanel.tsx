import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import React from 'react';
import Spacer from '../root/Spacer';

const SuggestionPanel = () => {
  const { polishResult } = useAiEditiorContext();
  return (
    <div className='flex min-h-full w-1/2 flex-col overflow-y-auto'>
      <div className='flex items-center gap-x-2'>
        <span className='small-semibold flex-center h-8 w-8 rounded-full border-shadow-border bg-primary-50 '>
          {polishResult.length}
        </span>
        <h2 className='base-semibold'>All Suggestions</h2>
      </div>
      <Spacer y='24' />
      {polishResult.map((item, index) => (
        <div
          className='mt-4 w-full shrink-0 cursor-pointer rounded-lg border border-shadow-border px-4 py-3'
          key={`polish-${index}`}
        >
          <p>
            {item.new_sentence.map((sentence, idx) => (
              <span
                key={`sentence-${index}-${idx}`}
                className={`${
                  sentence.is_identical ? 'text-black-100' : 'text-primary-200'
                }`}
              >
                {sentence.sub_str}&nbsp;
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SuggestionPanel;
