import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { MaterialItem } from '@/types/brainstorm/types';

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
        <p className='text-xs text-neutral-400'>Opened 2 Days ago</p>
        <div className='flex gap-x-2'>
          <Tooltip tooltipContent='Edit'>
            <Button className='size-max p-0' role='button' variant={'icon'}>
              <Icon
                className='size-4'
                width={20}
                height={20}
                alt='edit'
                src='/workbench/edit.svg'
              />
            </Button>
          </Tooltip>
          <Tooltip tooltipContent='Delete'>
            <Button className='size-max p-0' role='button' variant={'icon'}>
              <Icon
                className='size-4'
                width={20}
                height={20}
                alt='edit'
                src='/workbench/delete.svg'
              />
            </Button>
          </Tooltip>
        </div>
      </footer>
    </div>
  );
};

export default MaterialGridItem;
