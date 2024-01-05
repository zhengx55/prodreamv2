'use client';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { activity_list_loading_prompt } from '@/constant';
import { PrimarySpinner } from '../root/SvgComponents';

const PolishLoader = ({
  toogleLoadingModal,
}: {
  toogleLoadingModal: () => void;
}) => {
  const prompt_index = Math.floor(
    Math.random() * activity_list_loading_prompt.length
  );
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-shadow-50/80'>
      <div className='flex flex-col gap-y-4 bg-white shadow-tooltip md:w-[400px] md:rounded-lg md:p-4'>
        <div className='flex items-center gap-x-2'>
          <PrimarySpinner />
          <h2 className='base-semibold'>Editing</h2>
        </div>
        <div className='flex rounded-lg bg-shadow-50 p-4 text-justify text-regular'>
          {activity_list_loading_prompt[prompt_index]}
        </div>
        <Button
          onClick={toogleLoadingModal}
          className='text-primary-200'
          variant={'ghost'}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default memo(PolishLoader);
