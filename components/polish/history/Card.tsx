'use client';
import Spacer from '@/components/root/Spacer';
import { FileIcon } from '@/components/root/SvgComponents';
import { formatTimestamphh_number } from '@/lib/utils';
import { IDocDetail } from '@/query/type';
import Link from 'next/link';
import HistoryDropDown from './HistoryDropDown';

type Props = {
  item: IDocDetail;
  toggleDeleteModal: (value: boolean) => void;
  setCurrentItem: (value: IDocDetail) => void;
  toggleMoveModal: (value: boolean) => void;
};
const Card = ({
  setCurrentItem,
  toggleDeleteModal,
  toggleMoveModal,
  item,
}: Props) => {
  return (
    <Link passHref href={`/writtingpal/polish/${item.id}`}>
      <li className='flex h-[200px] w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-shadow-border hover:shadow-lg hover:brightness-95'>
        <div className='h-4/5 w-full rounded-t-lg bg-nav-selected px-3 py-2.5'>
          <FileIcon />
          <Spacer y='5' />
          <h1 className='small-semibold line-clamp-2 capitalize'>
            {item.title === '' ? 'Untitled Document' : item.title}
          </h1>
          <Spacer y='5' />
          <p
            className='subtle-regular line-clamp-4 text-shadow'
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
        <div className='flex h-1/5 w-full flex-col justify-between rounded-b-lg px-2 py-2'>
          <div className='flex-between'>
            <p className='subtle-regular text-shadow'>
              Opened {formatTimestamphh_number(item.update_time)}
            </p>
            <HistoryDropDown
              toggleMoveModal={toggleMoveModal}
              toggleDeleteModal={toggleDeleteModal}
              setCurrentItem={setCurrentItem}
              item={item}
            />
          </div>
        </div>
      </li>
    </Link>
  );
};
export default Card;
