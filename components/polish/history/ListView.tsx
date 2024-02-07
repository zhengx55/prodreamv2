'use client';
import { FileIcon } from '@/components/root/SvgComponents';
import { formatTimestamphh_number } from '@/lib/utils';
import { IDocDetail } from '@/query/type';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const HistoryDropDown = dynamic(() => import('./HistoryDropDown'));
type Props = {
  list: IDocDetail[];
};
const ListView = ({ list }: Props) => {
  return (
    <ul role='list' className='flex w-[1100px] flex-col gap-y-2'>
      {list.map((item) => (
        <Link key={item.id} passHref href={`/editor/${item.id}`}>
          <li className='flex-between cursor-pointer items-center rounded-lg py-2 hover:bg-nav-selected'>
            <span className='flex items-center gap-x-1.5'>
              <FileIcon />
              <p className='small-regular capitalize'>
                {item.title === 'Untitled' || !item.title
                  ? 'Untitled Document'
                  : item.title}
              </p>
            </span>
            <div className='flex-between w-1/3'>
              <p className='small-regular text-shadow'>
                Opened {formatTimestamphh_number(item.update_time)}
              </p>
              <HistoryDropDown item={item} />
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default ListView;
