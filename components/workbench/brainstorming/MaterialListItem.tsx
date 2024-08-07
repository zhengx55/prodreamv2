import Icon from '@/components/root/Icon';
import { formatTimestamphh } from '@/lib/utils';
import { MaterialItem } from '@/types/brainstorm/types';
import { useMemo } from 'react';
import Menu from '../common/Menu';

type Props = { item: MaterialItem };

const MaterialListItem = ({ item }: Props) => {
  const lastOpenTime = useMemo(
    () => formatTimestamphh(item.update_time),
    [item.update_time]
  );
  return (
    <div className='flex-between h-11 cursor-pointer rounded-lg px-2 hover:bg-slate-200'>
      <div className='flex w-[200px] items-center gap-x-2'>
        <Icon
          src='/workbench/material_file.svg'
          alt={item.title}
          width={24}
          height={24}
          className='size-6'
        />
        <h2 className='base-medium line-clamp-1 text-zinc-600'>{item.title}</h2>
      </div>
      <p className='text-xs text-neutral-400'>Opened {lastOpenTime}</p>

      <Menu type='material' id={item.id} href={`/brainstorming/${item.id}`} />
    </div>
  );
};

export default MaterialListItem;
