'use client';
import Icon from '@/components/root/Icon';
import { formatTimestamphh_number } from '@/lib/utils';
import { IDocDetail } from '@/query/type';
import { useTranslations } from 'next-intl';
import { DocPageDicType } from '@/types';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const HistoryDropDown = dynamic(() => import('./HistoryDropDown'));
type Props = {
  list: IDocDetail[];
} & DocPageDicType;
const ListView = ({ list, t, lang }: Props) => {
  const trans = useTranslations('Editor');
  const tCommonSense = useTranslations('CommonSense');

  return (
    <ul role='list' className='flex w-[1100px] flex-col gap-y-2'>
      {list.map((item) => (
        <Link
          key={item.id}
          passHref
          prefetch={false}
          href={`/${lang}/editor/${item.id}`}
        >
          <li className='flex-between cursor-pointer items-center rounded-lg py-2 hover:bg-nav-selected'>
            <span className='flex items-center gap-x-1.5'>
              <Icon
                alt='file'
                src='/editor/file.svg'
                width={24}
                height={24}
                className='size-6'
              />
              <p className='small-regular capitalize'>
                {item.title === 'Untitled' || !item.title
                  ? trans('Card.Untitled_Document')
                  : item.title}
              </p>
            </span>
            <div className='flex-between w-1/3'>
              <p className='small-regular text-shadow'>
                {trans('Card.Opened')}{' '}
                {formatTimestamphh_number(item.update_time, tCommonSense)}
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
