import { formatTimestampToDateString } from '@/lib/utils';
import { IEvaluationHistory } from '@/types';

type Props = { item: IEvaluationHistory };
const Card = ({ item }: Props) => {
  return (
    <div className='flex h-[250px] w-full shrink-0 flex-col overflow-hidden rounded-lg border border-shadow-border hover:shadow-lg hover:brightness-95'>
      <div className='h-2/3 w-full rounded-t-lg bg-nav-selected px-2 py-2.5'>
        <p className='subtle-regular line-clamp-[8] text-shadow'>{item.text}</p>
      </div>
      <div className='flex h-1/3 w-full flex-col rounded-b-lg p-4'>
        <h1 className='small-semibold line-clamp-1'>example title</h1>
        <p className='subtle-regular text-shadow'>
          {formatTimestampToDateString(item.create_time)}
        </p>
      </div>
    </div>
  );
};
export default Card;
