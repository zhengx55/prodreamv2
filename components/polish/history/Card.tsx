'use client';
import Spacer from '@/components/root/Spacer';
import { FileIcon } from '@/components/root/SvgComponents';
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
      className='flex h-[200px] w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-shadow-border hover:shadow-lg hover:brightness-95'
    >
      <div className='h-4/5 w-full rounded-t-lg bg-nav-selected px-3 py-2.5'>
        <FileIcon />
        <Spacer y='5' />
        <h1 className='small-semibold line-clamp-2 capitalize'>
          {item.title === 'Untitled' ? 'Untitled Document' : item.title}
        </h1>
        <Spacer y='5' />
        <p
          className='subtle-regular line-clamp-4 text-shadow'
          dangerouslySetInnerHTML={{ __html: item.text }}
        ></p>
      </div>
      <div className='flex h-1/5 w-full flex-col justify-between rounded-b-lg px-2 py-2'>
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
