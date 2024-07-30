'use client';

import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { MaterialItem } from '@/types/brainstorm/types';
import { List, SortAsc } from 'lucide-react';
import { memo, useState } from 'react';
import Pagination from '../common/Pagination';
import MaterialGrid from './MaterialGrid';
import MaterialList from './MaterialList';

type Props = {
  pageCount: number;
  list: MaterialItem[];
};

const MaterialSection = ({ list, pageCount }: Props) => {
  const [viewTyep, setViewType] = useState('grid');
  return (
    <div className='flex flex-1 flex-col gap-y-4 overflow-y-auto p-4'>
      <div className='flex-between'>
        <h3 className='text-xl text-zinc-500'>Recently</h3>
        <div className='flex gap-x-2'>
          <Tooltip tooltipContent='List View'>
            <Button role='button' className='size-max p-1' variant={'icon'}>
              <List size={24} />
            </Button>
          </Tooltip>
          <Tooltip tooltipContent='Sort'>
            <Button role='button' className='size-max p-1' variant={'icon'}>
              <SortAsc size={24} />
            </Button>
          </Tooltip>
        </div>
      </div>
      {viewTyep === 'grid' ? <MaterialGrid list={list} /> : <MaterialList />}
      {pageCount > 0 && <Pagination totalPage={pageCount} />}
    </div>
  );
};

export default memo(MaterialSection);
