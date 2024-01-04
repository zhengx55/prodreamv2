'use client';

import { FileIcon } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { IDocDetail } from '@/query/type';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';

type Props = {
  list: IDocDetail[];
  setCurrentItem: (value: IDocDetail) => void;
  toggleDeleteModal: (value: boolean) => void;
};
const ListView = ({ list, setCurrentItem, toggleDeleteModal }: Props) => {
  return (
    <ul role='list' className='flex w-full flex-col gap-y-2 px-6'>
      {list.map((item) => (
        <li
          className='flex-between cursor-pointer items-center py-2'
          key={item.id}
        >
          <Link passHref href={`/writtingpal/polish/${item.id}`}>
            <Button
              variant={'outline'}
              className='gap-x-1.5 border-none px-0 hover:underline'
            >
              <FileIcon />
              <p className='small-regular'>{item.title}</p>
            </Button>
          </Link>
          <div className='flex-between w-1/3'>
            <p className='small-regular text-shadow'>{item.create_time}</p>
            <span className='rounded-md p-1 hover:bg-shadow-border'>
              <MoreVertical
                className='text-shadow hover:opacity-50'
                size={18}
              />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ListView;
