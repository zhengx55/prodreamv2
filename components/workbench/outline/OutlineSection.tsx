'use client';

import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { OutlineItem, Prompt } from '@/types/outline';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Pagination from '../common/Pagination';
import useViewType from '../hooks/useViewTypes';
import OutlineGrid from './OutlineGrid';

const OutlineList = dynamic(() => import('./OutlineList'));
const Empty = dynamic(() => import('../common/Empty'));

type Props = {
  prompts: Prompt[];
  pageCount: number;
  list: OutlineItem[];
};

const OutlineSection = ({ pageCount, list, prompts }: Props) => {
  const { viewType, renderViewToggleButton } = useViewType();

  if (list.length === 0) {
    return (
      <div className='flex-center flex-1 bg-[#F6F7FB]'>
        <Empty
          label='New Outline'
          href='/outline/create'
          message='You can add it proactively or with the assistance of agents'
        />
      </div>
    );
  }
  return (
    <>
      <div className='flex flex-1 flex-col overflow-y-auto bg-[#F6F7FB] px-6 pb-10 pt-6'>
        <div className='flex-between'>
          <h3 className='w-[200px] text-base font-medium text-zinc-800'>
            Recently
          </h3>
          {viewType === 'list' ? (
            <>
              <p className='w-[200px] text-base text-zinc-600'>Prompt</p>
              <p className='w-[200px] text-base text-zinc-600'>Last Opened</p>
            </>
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
          <OutlineGrid prompts={prompts} list={list} />
        ) : (
          <OutlineList prompts={prompts} list={list} />
        )}
      </div>
      {pageCount > 0 && (
        <>
          <Spacer y='16' />
          <Pagination totalPage={pageCount} />
          <Spacer y='16' />
        </>
      )}
    </>
  );
};

export default memo(OutlineSection);
