'use client';
import { formatTimestamphh_number } from '@/lib/utils';
import { IDocDetail } from '@/query/type';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
const HistoryDropDown = dynamic(() => import('./HistoryDropDown'));

type Props = {
  item: IDocDetail;
  toggleDeleteModal: (value: boolean) => void;
  setCurrentItem: (value: IDocDetail) => void;
};
const Card = ({ setCurrentItem, toggleDeleteModal, item }: Props) => {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(`/writtingpal/polish/${item.id}`);
        router.refresh();
      }}
      className='flex h-[250px] w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-shadow-border hover:shadow-lg hover:brightness-95'
    >
      <div className='h-2/3 w-full rounded-t-lg bg-nav-selected px-3 py-2.5'>
        <p className='subtle-regular line-clamp-[8] text-shadow'>{item.text}</p>
      </div>
      <div className='flex h-1/3 w-full flex-col justify-between rounded-b-lg px-4 py-2'>
        <h1 className='small-semibold line-clamp-2'>
          {item.title === 'Untitled' ? 'Untitled Document' : item.title}
        </h1>
        <div className='flex-between'>
          <p className='subtle-regular text-shadow'>
            Opened {formatTimestamphh_number(item.update_time)}
          </p>
          <HistoryDropDown
            toggleDeleteModal={toggleDeleteModal}
            setCurrentItem={setCurrentItem}
            item={item}
          />
        </div>
      </div>
    </li>
  );
};
export default Card;
