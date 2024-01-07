'use client';

import { FileIcon } from '@/components/root/SvgComponents';
import { formatTimestamphh_number } from '@/lib/utils';
import { IDocDetail } from '@/query/type';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
const HistoryDropDown = dynamic(() => import('./HistoryDropDown'));

type Props = {
  list: IDocDetail[];
  setCurrentItem: (value: IDocDetail) => void;
  toggleDeleteModal: (value: boolean) => void;
  toggleMoveModal: (value: boolean) => void;
};
const ListView = ({
  list,
  setCurrentItem,
  toggleDeleteModal,
  toggleMoveModal,
}: Props) => {
  const router = useRouter();
  return (
    <ul role='list' className='flex w-[1100px] flex-col gap-y-2'>
      {list.map((item) => (
        <li
          onClick={() => {
            router.push(`/writtingpal/polish/${item.id}`);
            router.refresh();
          }}
          className='flex-between cursor-pointer items-center rounded-lg py-2 hover:bg-nav-selected'
          key={item.id}
        >
          <span className='flex items-center gap-x-1.5'>
            <FileIcon />
            <p className='small-regular capitalize'>{item.title}</p>
          </span>
          <div className='flex-between w-1/3'>
            <p className='small-regular text-shadow'>
              Opened {formatTimestamphh_number(item.update_time)}
            </p>
            <HistoryDropDown
              toggleMoveModal={toggleMoveModal}
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
