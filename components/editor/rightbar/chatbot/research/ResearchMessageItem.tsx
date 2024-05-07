import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AIResearchMessage, EditorDictType } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, ThumbsDown, Triangle } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { memo, useState } from 'react';

type Props = { message: AIResearchMessage; t: EditorDictType; index: number };
const ResearchMessageItem = ({ message, t, index }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2'>
        <Button
          role='button'
          onClick={toggleExpansion}
          className='size-max gap-x-2 p-0'
          variant={'icon'}
        >
          <Triangle
            className={cn(
              `${isExpanded ? 'rotate-180' : 'rotate-90'}`,
              'fill-black'
            )}
            size={12}
          />
          <h1 className='text-lg font-medium'>Question {index + 1}</h1>
        </Button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className='text-sm font-normal text-zinc-600'>
              {message.message}
            </p>
            {message.reference.length > 0 && (
              <div className='flex-between my-2'>
                <Button
                  onClick={async () => {
                    navigator.clipboard.writeText(message.message);
                    const { toast } = await import('sonner');
                    toast.success('Copied to clipboard');
                  }}
                  role='button'
                  variant={'icon'}
                  className='size-max p-1'
                >
                  <Copy size={16} className='text-stone-400' />
                  <p className='subtle-regular text-stone-400'>Copy</p>
                </Button>
                <Button role='button' variant={'icon'} className='size-max p-1'>
                  <ThumbsDown size={16} className='text-stone-400' />
                </Button>
              </div>
            )}
            {message.reference.map((ref, idx) => {
              return (
                <div
                  className='flex flex-col gap-y-2 border-t border-gray-200 py-4'
                  key={`reference-${idx}-${index}`}
                >
                  <div className='flex items-center gap-x-2'>
                    <span className='h-4 w-4 rounded-full bg-zinc-300' />
                    <h3 className='small-regular line-clamp-1 max-w-[80%] text-zinc-600'>
                      {ref.link}
                    </h3>
                  </div>
                  <Link target='_blank' href={ref.link as Route}>
                    <h4 className='base-medium hover:text-violet-500'>
                      {ref.title}
                    </h4>
                  </Link>
                  <p className='small-regular text-zinc-600'>{ref.snippet}</p>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default memo(ResearchMessageItem);
