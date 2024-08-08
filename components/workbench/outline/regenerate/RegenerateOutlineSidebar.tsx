'use client';

import Spacer from '@/components/root/Spacer';
import { useGetMaterialsByIds } from '@/query/outline/query';
import { OutlineItem, Prompt } from '@/types/outline';
import { Loader2 } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import RegenerateOutlineButton from './RegenerateOutlineButton';
import SelectOtherButton from './SelectOtherButton';

type Props = { prompts: Prompt[]; data: OutlineItem };

const RegenerateOutlineSidebar = ({ prompts, data }: Props) => {
  const [materials, setMaterials] = useState<string[]>(data.material_ids);
  const [prompt, setPrompt] = useState<string>(data.prompt_id);
  const { data: selectedMaterials, isLoading } =
    useGetMaterialsByIds(materials);

  const promptTitle = useMemo(
    () => prompts.find((item) => item.id === prompt)?.title,
    [prompt]
  );

  const updateMaterials = useCallback((materials: string[]) => {
    setMaterials(materials);
  }, []);

  const updatePrompt = useCallback((prompt_id: string) => {
    setPrompt(prompt_id);
  }, []);

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
          <SelectOtherButton
            prompts={prompts}
            defaultPrompt={data.prompt_id}
            defaultMaterials={data.material_ids}
            setPrompt={updatePrompt}
            setMaterials={updateMaterials}
          />
        </div>
        <Spacer y='16' />
        <div className='flex flex-1 flex-col gap-y-1 overflow-y-auto'>
          {isLoading ? (
            <span className='flex-center flex-1'>
              <Loader2 className='animate-spin text-indigo-500' />
            </span>
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
      <RegenerateOutlineButton materials={materials} prompt={prompt} />
    </aside>
  );
};

export default memo(RegenerateOutlineSidebar);
