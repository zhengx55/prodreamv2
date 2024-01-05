'use client';

import { FileIcon } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { formatTimestamphh_number } from '@/lib/utils';
import { IDocDetail } from '@/query/type';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const HistoryDropDown = dynamic(() => import('./HistoryDropDown'));

type Props = {
  list: IDocDetail[];
  setCurrentItem: (value: IDocDetail) => void;
  toggleDeleteModal: (value: boolean) => void;
};
const ListView = ({ list, setCurrentItem, toggleDeleteModal }: Props) => {
  return (
    <ul role='list' className='flex w-full flex-col gap-y-2 pl-6 pr-16'>
      {list.map((item) => (
        <li className='flex-between items-center py-2' key={item.id}>
          <Link passHref href={`/writtingpal/polish/${item.id}`}>
            <Button
              variant={'outline'}
              className='gap-x-1.5 border-none px-0 hover:underline'
            >
              <FileIcon />
              <p className='small-regular capitalize'>{item.title}</p>
            </Button>
          </Link>
          <div className='flex-between w-1/3'>
            <p className='small-regular pl-7 text-shadow'>
              Opened {formatTimestamphh_number(item.update_time)}
            </p>
            <HistoryDropDown
              toggleDeleteModal={toggleDeleteModal}
              setCurrentItem={setCurrentItem}
              item={item}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ListView;
