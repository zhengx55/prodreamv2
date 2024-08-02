'use client';

import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { EssayItem } from '@/types/outline/types';
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
    <>
      <div className='flex-1 overflow-y-auto bg-slate-50 px-6 pb-10 pt-6'>
        <div className='flex-between'>
          <h3 className='text-base font-medium text-zinc-800'>Recently</h3>
          <div className='flex gap-x-2'>
            {viewTyep === 'grid' ? (
              <Tooltip tooltipContent='List View'>
                <Button
                  role='button'
                  onClick={() => setViewType('list')}
                  className='size-max p-1'
                  variant={'icon'}
                >
                  <Icon
                    alt='list'
                    src='/workbench/list_view.svg'
                    width={20}
                    priority
                    className='size-4'
                    height={20}
                  />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip tooltipContent='Grid View'>
                <Button
                  onClick={() => setViewType('grid')}
                  role='button'
                  className='size-max p-1'
                  variant={'icon'}
                >
                  <Icon
                    alt='grid'
                    src='/workbench/grid_view.svg'
                    width={20}
                    className='size-4'
                    height={20}
                  />
                </Button>
              </Tooltip>
            )}
            <Tooltip tooltipContent='Sort'>
              <Button role='button' className='size-max p-1' variant={'icon'}>
                <Icon
                  alt='sort'
                  src='/workbench/sort.svg'
                  width={20}
                  className='size-4'
                  priority
                  height={20}
                />
              </Button>
            </Tooltip>
          </div>
        </div>
        <Spacer y='16' />
        {viewTyep === 'grid' ? <OutlineGrid list={list} /> : <OutlineList />}
      </div>
      <Spacer y='16' />
      {pageCount > 0 && <Pagination totalPage={pageCount} />}
      <Spacer y='16' />
    </>
  );
};

export default memo(OutlineSection);
