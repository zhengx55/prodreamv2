'use client';

import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { EssayItem } from '@/types/outline/types';
import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import OutlineGrid from './OutlineGrid';

const ListView = dynamic(() => import('./OutlineList'));
const Empty = dynamic(() => import('../common/Empty'));
const Pagination = dynamic(() => import('../common/Pagination'));

type Props = {
  pageCount: number;
  list: EssayItem[];
};

const OutlineSection = ({ pageCount, list }: Props) => {
  const [viewType, setViewType] = useState('grid');

  const toggleViewType = () => {
    setViewType((prevType) => (prevType === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div className='flex flex-1 flex-col overflow-y-auto bg-slate-100 px-6 pb-10 pt-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-base font-medium text-zinc-800'>Recently</h3>
        <div className='flex gap-x-2'>
          <Tooltip
            tooltipContent={viewType === 'grid' ? 'List View' : 'Grid View'}
          >
            <Button
              role='button'
              onClick={toggleViewType}
              className='size-max p-1'
              variant={'icon'}
            >
              <Icon
                alt={viewType === 'grid' ? 'list' : 'grid'}
                src={`/workbench/${viewType === 'grid' ? 'list_view' : 'grid_view'}.svg`}
                width={20}
                height={20}
                className='size-4'
                priority
              />
            </Button>
          </Tooltip>
          <Tooltip tooltipContent='Sort'>
            <Button role='button' className='size-max p-1' variant={'icon'}>
              <Icon
                alt='sort'
                src='/workbench/sort.svg'
                width={20}
                height={20}
                className='size-4'
                priority
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Spacer y='16' />
      {list.length === 0 ? (
        <Empty
          label='Add Outline'
          href='/outline/create'
          message='You can add it proactively or with the assistance of agents'
        />
      ) : viewType === 'grid' ? (
        <OutlineGrid list={list} />
      ) : (
        <ListView />
      )}
      <Spacer y='16' />
      {pageCount > 0 && <Pagination totalPage={pageCount} />}
      <Spacer y='16' />
    </div>
  );
};

export default memo(OutlineSection);
