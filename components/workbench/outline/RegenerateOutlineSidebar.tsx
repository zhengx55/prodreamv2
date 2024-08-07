'use client';

import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { useGetMaterialsByIds } from '@/query/outline/query';
import { OutlineItem, Prompt } from '@/types/outline/types';
import { memo, useMemo } from 'react';
import RegenerateOutlineButton from './RegenerateOutlineButton';

type Props = { prompts: Prompt[]; data: OutlineItem };

const RegenerateOutlineSidebar = ({ prompts, data }: Props) => {
  const { data: selectedMaterials, isLoading } = useGetMaterialsByIds(
    data.material_ids
  );

  const promptTitle = useMemo(
    () => prompts.find((item) => item.id === data.prompt_id)?.title,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.prompt_id]
  );

  return (
    <aside className='flex h-full w-[272px] flex-col rounded-bl-lg border-r border-zinc-200 p-4'>
      <div className='flex flex-1 flex-col'>
        <h2 className='base-medium'>Prompt</h2>
        <Spacer y='4' />
        <span className='small-regular w-full rounded-md bg-slate-100 p-2 text-zinc-600'>
          {promptTitle}
        </span>
        <Spacer y='16' />
        <div className='flex items-center justify-between'>
          <h2 className='base-medium'>Materials</h2>
          <Button variant={'ghost'} className='p-0'>
            Select Other
          </Button>
        </div>
        <Spacer y='16' />
        <div className='flex flex-1 flex-col gap-y-1 overflow-y-auto'>
          {isLoading ? (
            <span className='text-center text-zinc-600'>Loading...</span>
          ) : (
            selectedMaterials?.map((material) => (
              <div
                key={material.id}
                className='h-36 w-full space-y-2 rounded-lg border border-gray-300 p-2'
              >
                <h2 className='line-clamp-1 text-base font-semibold leading-7'>
                  {material.title}
                </h2>
                <p className='small-regular line-clamp-4 text-zinc-600'>
                  {material.content}
                </p>
              </div>
            ))
          )}
        </div>
        <Spacer y='16' />
      </div>
      <RegenerateOutlineButton />
    </aside>
  );
};

export default memo(RegenerateOutlineSidebar);
