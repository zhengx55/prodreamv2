'use client';

import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { MaterialItem } from '@/types/brainstorm/types';
import { memo, useCallback, useState } from 'react';
import Pagination from '../common/Pagination';
import MaterialGrid from './MaterialGrid';
import MaterialList from './MaterialList';

type Props = {
  pageCount: number;
  list: MaterialItem[];
};

const MaterialSection = ({ list, pageCount }: Props) => {
  const [viewType, setViewType] = useState<'list' | 'grid'>('grid');

  const handleViewChange = useCallback((type: 'list' | 'grid') => {
    setViewType(type);
  }, []);

  const renderViewToggleButton = useCallback(() => {
    return viewType === 'grid' ? (
      <Tooltip tooltipContent='List View'>
        <Button
          role='button'
          onClick={() => handleViewChange('list')}
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
          onClick={() => handleViewChange('grid')}
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
    );
  }, [viewType, handleViewChange]);

  return (
    <>
      <div className='flex-1 overflow-y-auto bg-slate-50 px-6 pb-10 pt-6'>
        <div className='flex-between'>
          <h3 className='w-[200px] text-base font-medium text-zinc-800'>
            Recently
          </h3>
          {viewType === 'list' ? (
            <p className='text-base text-zinc-600'>Last Opened</p>
          ) : null}
          <div className='flex gap-x-2'>
            {renderViewToggleButton()}
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
        {viewType === 'grid' ? (
          <MaterialGrid list={list} />
        ) : (
          <MaterialList list={list} />
        )}
      </div>
      <Spacer y='16' />
      {pageCount > 0 && <Pagination totalPage={pageCount} />}
      <Spacer y='16' />
    </>
  );
};

export default memo(MaterialSection);
