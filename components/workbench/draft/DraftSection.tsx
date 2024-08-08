'use client';
import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { Draft } from '@/types/draft';
import { Prompt } from '@/types/outline';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Empty from '../common/Empty';
import Pagination from '../common/Pagination';
import useViewType from '../hooks/useViewTypes';
import DraftGrid from './DraftGrid';

const DraftList = dynamic(() => import('./DraftList'));

type Props = {
  list: Draft[];
  pageCount: number;
  prompts: Prompt[];
};

const DraftSection = ({ list, pageCount, prompts }: Props) => {
  const { viewType, renderViewToggleButton } = useViewType();

  return (
    <>
      <div className='flex flex-1 flex-col overflow-y-auto bg-slate-100 px-6 pb-10 pt-6'>
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
        {list.length === 0 ? (
          <Empty
            label='Add Draft'
            href='/draft&feedback/create'
            message='You can add it proactively or with the assistance of agents'
          />
        ) : viewType === 'grid' ? (
          <DraftGrid prompts={prompts} list={list} />
        ) : (
          <DraftList prompts={prompts} list={list} />
        )}
      </div>
      <Spacer y='16' />
      {pageCount > 0 && <Pagination totalPage={pageCount} />}
      <Spacer y='16' />
    </>
  );
};

export default memo(DraftSection);
