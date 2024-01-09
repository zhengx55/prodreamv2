import { ActData } from '@/query/type';
import { memo } from 'react';

type Props = { item: ActData; index: number };

const Card = ({ item, index }: Props) => {
  return (
    <div className='flex w-[360px] flex-col gap-y-3 rounded-[10px] border border-shadow-border p-4'>
      <h2 className='base-semibold line-clamp-2'>
        Activity {index}: {item.title}
      </h2>
      <p className='base-regular line-clamp-4'>{item.text}</p>
      <p className='small-regular'>({item.text?.length} characters)</p>
    </div>
  );
};

export default memo(Card);
