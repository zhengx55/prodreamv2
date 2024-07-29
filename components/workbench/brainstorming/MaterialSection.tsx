'use client';

import { Button } from '@/components/ui/button';
import { List, SortAsc } from 'lucide-react';
import { memo } from 'react';
import MaterialGrid from './MaterialGrid';

type Props = {};

const MaterialSection = (props: Props) => {
  return (
    <div className='flex flex-col gap-y-4 p-4'>
      <div className='flex-between'>
        <h3 className='text-xl text-zinc-500'>Recently</h3>
        <div className='flex gap-x-2'>
          <Button role='button' className='size-max p-1' variant={'icon'}>
            <List size={24} />
          </Button>
          <Button role='button' className='size-max p-1' variant={'icon'}>
            <SortAsc size={24} />
          </Button>
        </div>
      </div>
      <MaterialGrid />
    </div>
  );
};

export default memo(MaterialSection);
