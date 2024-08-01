import { formatTimestamphh } from '@/lib/utils';
import { EssayItem } from '@/types/outline/types';
import { memo } from 'react';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';
type Props = { item: EssayItem };

const OutlineGridItem = ({ item }: Props) => {
  return (
    <div className='flex h-[200px] w-[318px] flex-col justify-between rounded-lg border'>
      <div className='cursor-pointer space-y-2.5 p-4'>
        <h2 className='base-medium line-clamp-1 text-zinc-600'>{item.title}</h2>
        <p className='small-regular line-clamp-4 text-zinc-600'>
          {item.results}
        </p>
      </div>
      <footer className='flex-between bg-slate-50 px-4 py-2.5'>
        <p className='text-xs text-neutral-400'>
          Opened {formatTimestamphh(item.update_time)}
        </p>
        <div className='flex items-center gap-x-2'>
          <EditButton href={`/outline/${item.id}`} />
          <DeleteButton type='outline' id={item.id} />
        </div>
      </footer>
    </div>
  );
};

export default memo(OutlineGridItem);
