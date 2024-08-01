import { formatTimestamphh } from '@/lib/utils';
import { MaterialItem } from '@/types/brainstorm/types';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';

type Props = { item: MaterialItem };

const MaterialGridItem = ({ item }: Props) => {
  return (
    <div className='flex h-[200px] w-[318px] flex-col justify-between rounded-lg border'>
      <div className='cursor-pointer space-y-2.5 p-4'>
        <h2 className='base-medium line-clamp-1 text-zinc-600'>{item.title}</h2>
        <p className='small-regular line-clamp-4 text-zinc-600'>
          {item.content}
        </p>
      </div>
      <footer className='flex-between bg-slate-50 px-4 py-2.5'>
        <p className='text-xs text-neutral-400'>
          Opened {formatTimestamphh(item.update_time)}
        </p>
        <div className='flex items-center gap-x-2'>
          <EditButton href={`/brainstorming/${item.id}/edit`} />
          <DeleteButton id={item.id} type='material' />
        </div>
      </footer>
    </div>
  );
};

export default MaterialGridItem;
