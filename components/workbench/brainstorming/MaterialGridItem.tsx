import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';

type Props = {};

const MaterialGridItem = (props: Props) => {
  return (
    <div className='flex h-[200px] w-[318px] flex-col justify-between rounded-lg border'>
      <div className='cursor-pointer space-y-2.5 p-4'>
        <h2 className='base-medium line-clamp-1 text-zinc-600'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit eaque
          sapiente autem expedita temporibus nulla aspernatur quasi mollitia
          ipsam perspiciatis earum corrupti deleniti laboriosam totam, obcaecati
          consequuntur rerum quisquam libero?
        </h2>
        <p className='small-regular line-clamp-4 text-zinc-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci in
          rem eveniet velit vitae dicta dolorum quo repudiandae veritatis, iure
          consequuntur ad, totam porro. Praesentium, aut vel. Eaque, impedit
          veritatis!
        </p>
      </div>
      <footer className='flex-between bg-slate-50 px-4 py-2.5'>
        <p className='text-xs text-neutral-400'>Opened 2 Days ago</p>
        <div className='flex gap-x-2'>
          <Button className='size-max p-0' role='button' variant={'icon'}>
            <Icon
              className='size-4'
              width={20}
              height={20}
              alt='edit'
              src='/workbench/edit.svg'
            />
          </Button>
          <Button className='size-max p-0' role='button' variant={'icon'}>
            <Icon
              className='size-4'
              width={20}
              height={20}
              alt='edit'
              src='/workbench/delete.svg'
            />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default MaterialGridItem;
