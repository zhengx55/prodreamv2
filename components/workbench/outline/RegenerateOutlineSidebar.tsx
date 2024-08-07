'use client';

import { Prompt } from '@/types/outline/types';
import { memo } from 'react';
import RegenerateOutlineButton from './RegenerateOutlineButton';

type Props = { prompts: Prompt[] };

const RegenerateOutlineSidebar = ({ prompts }: Props) => {
  return (
    <aside className='flex h-full w-72 flex-col overflow-y-auto rounded-bl-lg border-r border-zinc-200 px-4 py-6'>
      <RegenerateOutlineButton />
    </aside>
  );
};

export default memo(RegenerateOutlineSidebar);
