import Icon from '@/components/root/Icon';
import { memo } from 'react';

const DeleteButton = () => {
  return (
    <button className='inline-flex w-full items-center gap-x-1 rounded-lg px-2 py-1 hover:bg-slate-200'>
      <Icon
        className='size-6'
        width={24}
        height={24}
        alt='edit'
        src='/workbench/delete.svg'
      />
      <span className='base-regular text-zinc-600'>Delete</span>
    </button>
  );
};

export default memo(DeleteButton);
