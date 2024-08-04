import Icon from '@/components/root/Icon';
import { formatTimestamphh } from '@/lib/utils';
import { MaterialItem } from '@/types/brainstorm/types';
import { useMemo } from 'react';
import Menu from '../common/Menu';

type Props = { item: MaterialItem };

const MaterialGridItem = ({ item }: Props) => {
  const lastOpenTime = useMemo(
    () => formatTimestamphh(item.update_time),
    [item.update_time]
  );
  return (
    <div className='flex w-[330px] flex-col justify-between rounded-lg border'>
      <div className='h-[164px] bg-gray-100 px-2 pt-2'>
        <div className='size-full bg-white p-2'>
          <p className='small-regular line-clamp-3 leading-tight text-zinc-600'>
            {item.content}
          </p>
        </div>
      </div>
      <footer className='flex-between border-t bg-white px-4 py-2.5'>
        <div className='space-y-1'>
          <div className='flex items-center gap-x-2'>
            <Icon
              src='/workbench/material_file.svg'
              alt={item.title}
              width={24}
              height={24}
              className='size-6'
            />
            <h2 className='base-medium line-clamp-1 max-w-[70%] text-zinc-600'>
              {item.title}
            </h2>
          </div>
          <p className='text-xs text-neutral-400'>Opened {lastOpenTime}</p>
        </div>
        <Menu
          type='material'
          id={item.id}
          href={`/brainstorming/${item.id}/edit`}
        />
      </footer>
    </div>
  );
};

export default MaterialGridItem;
