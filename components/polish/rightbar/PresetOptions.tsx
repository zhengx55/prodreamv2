'use client';
import { PresetIcons } from '@/constant';
import { usePreDefinedOptions } from '@/query/query';
import type { IPolishParams } from '@/query/type';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { toast } from 'sonner';
import { Button } from '../../ui/button';

type Props = {
  isPolishing: boolean;
  selectedText: string;
  polish: UseMutateAsyncFunction<any, Error, IPolishParams, void>;
  removeSelected: () => void;
};

const PresetOptions = ({
  isPolishing,
  polish,
  removeSelected,
  selectedText,
}: Props) => {
  const { data: options, isPending: isOptionsLoading } = usePreDefinedOptions();
  const handlePolishSubmit = async (option: string | number) => {
    if (!selectedText) {
      toast.error('no content selected');
      return;
    }
    await polish({ instruction: option, text: selectedText });
  };
  return isPolishing || isOptionsLoading ? (
    <div className='flex w-full shrink-0 gap-x-2 rounded-lg border border-shadow-border px-3 py-2 '>
      <h2 className='base-semibold'>Polishing:</h2>
      <Loader2 className='animate-spin' />
    </div>
  ) : (
    <div className='flex w-full shrink-0 flex-col gap-y-2 rounded-lg border border-shadow-border px-3 py-2 '>
      <h2 className='base-semibold'>Polishing:</h2>
      <div className='flex-between items-start rounded-lg bg-nav-selected p-2'>
        <p className='base-regular line-clamp-2 w-11/12'>
          <strong>Work with: </strong>
          {selectedText}
        </p>
        <Trash2
          onClick={removeSelected}
          className='cursor-pointer hover:text-shadow-100'
          size={20}
        />
      </div>
      <p className='small-regular text-shadow'>Try the following ideas:</p>
      <div className='flex flex-wrap gap-2'>
        {Object.keys(options).map((option, idx) => {
          return (
            <Button
              variant={'ghost'}
              onClick={() => handlePolishSubmit(idx + 1)}
              className='cursor-pointer rounded-lg border border-shadow-border px-4 py-1 hover:opacity-50'
              key={option}
            >
              <Image
                alt={option}
                width={24}
                height={24}
                className='h-6 w-6'
                src={PresetIcons[idx + 1]}
              />
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(PresetOptions);
