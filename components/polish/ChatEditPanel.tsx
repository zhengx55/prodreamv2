import { memo } from 'react';
import Spacer from '../root/Spacer';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import { Textarea } from '../ui/textarea';
import { usePreDefinedOptions } from '@/query/query';
import { Trash2 } from 'lucide-react';

const ChatEditPanel = () => {
  const { selectText, setSelectText } = useAiEditiorContext();
  const { data: options } = usePreDefinedOptions();

  return (
    <div className='relative flex min-h-full w-1/2 flex-col justify-between overflow-y-hidden py-1'>
      <div className='flex h-full w-full flex-col overflow-y-auto'></div>
      <Spacer y='10' />
      <div className='flex w-full shrink-0 flex-col gap-y-2 rounded-lg border border-shadow-border px-3 py-2 '>
        <h2 className='base-semibold'>Polishing:</h2>
        <div className='flex-between items-start'>
          <p className='base-regular w-11/12'>{selectText}</p>
          <Trash2
            onClick={() => setSelectText('')}
            className='cursor-pointer hover:text-shadow-100'
          />
        </div>
        <div className='flex flex-wrap gap-2'>
          {Object.keys(options).map((option) => {
            return (
              <div
                className='cursor-pointer rounded-lg border border-shadow-border px-4 py-1'
                key={option}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <Spacer y='10' />
      <div className='relative h-14 w-full'>
        <Textarea
          aria-label='prompt'
          rows={1}
          className='base-regular min-h-full w-full py-4 shadow-md focus-visible:ring-0'
          placeholder='Tell us to ...'
        />
      </div>
    </div>
  );
};

export default memo(ChatEditPanel);
