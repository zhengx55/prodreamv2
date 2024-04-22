import { Button } from '@/components/ui/button';
import { AIResearchMessage, EditorDictType } from '@/types';
import { Copy, Repeat, ThumbsDown } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { memo } from 'react';

type Props = { message: AIResearchMessage; t: EditorDictType; index: number };
const ResearchMessageItem = ({ message, t, index }: Props) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <h2 className='text-base font-normal text-black'>{message.query}</h2>
      <p className='text-sm font-normal text-zinc-600'>{message.message}</p>
      {message.reference.length > 0 && (
        <div className='flex-between'>
          <div className='gapx-3 flex items-center'>
            <Button role='button' variant={'icon'} className='size-max p-1'>
              <Repeat size={16} className='text-stone-400' />
              <p className='subtle-regular text-stone-400'>Rewrite</p>
            </Button>
            <Button role='button' variant={'icon'} className='size-max p-1'>
              <Copy size={16} className='text-stone-400' />
              <p className='subtle-regular text-stone-400'>Copy</p>
            </Button>
          </div>
          <Button role='button' variant={'icon'} className='size-max p-1'>
            <ThumbsDown size={16} className='text-stone-400' />
          </Button>
        </div>
      )}
      {message.reference.map((ref, idx) => {
        return (
          <div
            className='flex flex-col gap-y-2 border-t border-gray-200 pt-4'
            key={`reference-${idx}-${index}`}
          >
            <div className='flex items-center gap-x-2'>
              <span className='h-4 w-4 rounded-full bg-zinc-300' />
              <h3 className='small-regular line-clamp-1 max-w-[80%] text-zinc-600'>
                {ref.link}
              </h3>
            </div>
            <Link target='_blank' href={ref.link as Route}>
              <h4 className='base-medium hover:text-violet-500'>{ref.title}</h4>
            </Link>
            <p className='small-regular text-zinc-600'>{ref.snippet}</p>
          </div>
        );
      })}
    </div>
  );
};
export default memo(ResearchMessageItem);
