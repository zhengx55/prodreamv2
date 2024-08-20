import Icon from '@/components/root/Icon';
import { formatTimestamphh } from '@/lib/utils';
import { MaterialItem } from '@/types/brainstorm';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Menu from '../common/Menu';

type Props = { item: MaterialItem };

const MaterialGridItem = ({ item }: Props) => {
  const lastOpenTime = useMemo(
    () => formatTimestamphh(item.update_time),
    [item.update_time]
  );
  const { push } = useRouter();
  return (
    <div className='flex w-[330px] select-none flex-col justify-between rounded-lg border border-gray-300'>
      <div className='group h-[164px] cursor-pointer rounded-t-lg bg-gray-100 px-2 pt-2'>
        <div
          className='size-full bg-white p-2 group-hover:bg-slate-50'
          onClick={() => {
            push(`/brainstorming/${item.id}`);
          }}
        >
          <p className='small-regular line-clamp-3 leading-tight text-zinc-600'>
            {item.content}
          </p>
        </div>
      </div>
      <footer className='flex-between rounded-b-lg border-t border-gray-300 bg-white px-4 py-2.5'>
        <div className='space-y-1'>
          <div className='flex items-center gap-x-2'>
            <Icon
              src='/workbench/material_file.svg'
              alt={item.title}
              width={24}
              height={24}
              className='size-6'
            />
            <h2 className='base-medium text-zinc-600'>
              {item.title.length > 20
                ? item.title.slice(0, 20) + '...'
                : item.title}
            </h2>
          </div>
          <p className='text-xs text-neutral-400'>Opened {lastOpenTime}</p>
        </div>
        <Menu type='material' id={item.id} href={`/brainstorming/${item.id}`} />
      </footer>
    </div>
  );
};

export default MaterialGridItem;
