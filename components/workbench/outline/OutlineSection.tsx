'use client';

import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { EssayItem } from '@/types/outline/types';
import { Layout, List, SortAsc } from 'lucide-react';
import { memo, useState } from 'react';
import Pagination from '../common/Pagination';
import OutlineGrid from './OutlineGrid';
import OutlineList from './OutlineList';
type Props = {
  pageCount: number;
  list: EssayItem[];
};

const OutlineSection = ({ pageCount, list }: Props) => {
  const [viewTyep, setViewType] = useState('grid');

  return (
    <div className='flex flex-1 flex-col gap-y-4 overflow-y-auto p-4'>
      <div className='flex-between'>
        <h3 className='text-xl text-zinc-500'>Recently</h3>
        <div className='flex gap-x-2'>
          {viewTyep === 'grid' ? (
            <Tooltip tooltipContent='List View'>
              <Button
                role='button'
                onClick={() => setViewType('list')}
                className='size-max p-1'
                variant={'icon'}
              >
                <List size={24} />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip tooltipContent='List View'>
              <Button
                onClick={() => setViewType('grid')}
                role='button'
                className='size-max p-1'
                variant={'icon'}
              >
                <Layout size={24} />
              </Button>
            </Tooltip>
          )}
          <Tooltip tooltipContent='Sort'>
            <Button role='button' className='size-max p-1' variant={'icon'}>
              <SortAsc size={24} />
            </Button>
          </Tooltip>
        </div>
      </div>
      {viewTyep === 'grid' ? <OutlineGrid list={list} /> : <OutlineList />}
      {pageCount > 0 && <Pagination totalPage={pageCount} />}
    </div>
  );
};

export default memo(OutlineSection);
