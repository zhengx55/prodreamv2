import Spacer from '@/components/root/Spacer';
import { FileIcon } from '@/components/root/SvgComponents';
import { formatTimestamphh_number } from '@/lib/utils';
import { IDocDetail } from '@/query/type';
import { DocPageDicType } from '@/types';
import { useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';
import HistoryDropDown from './HistoryDropDown';

type Props = {
  item: IDocDetail;
} & DocPageDicType;
const Card = ({ item, lang, t }: Props) => {
  const previewContent = useMemo(async () => {
    return item.content
      .replace(/<h1[^>]*>.*?<\/h1>/, '')
      .replace(/<[^>]+>/g, '')
      .slice(0, 200);
  }, [item.content]);
  const router = useRouter();
  return (
    <li className='flex h-[200px] w-full shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg hover:brightness-95'>
      <div
        onClick={() => router.push(`/${lang}/editor/${item.id}`)}
        className='h-4/5 w-full overflow-hidden rounded-t-lg bg-nav-selected px-3 py-2.5'
      >
        <FileIcon />
        <Spacer y='5' />
        <h1 className='small-semibold line-clamp-2 capitalize'>
          {item.title === 'Untitled' || !item.title
            ? 'Untitled Document'
            : item.title}
        </h1>
        <Spacer y='5' />
        <div className='subtle-regular line-clamp-4 text-shadow'>
          {previewContent}
        </div>
      </div>
      <div className='flex h-1/5 w-full flex-col justify-between rounded-b-lg px-2 py-2'>
        <div className='flex-between'>
          <p className='subtle-regular text-shadow'>
            Opened {formatTimestamphh_number(item.update_time)}
          </p>
          <HistoryDropDown item={item} />
        </div>
      </div>
    </li>
  );
};
export default memo(Card);
