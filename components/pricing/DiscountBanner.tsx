import { memo } from 'react';
import DiscountCountdown from './DiscountCountdown';

type Props = { time: number };
const DiscountBanner = ({ time }: Props) => {
  return (
    <div className='flex h-6 w-full'>
      <span className='flex-center h-full w-1/5 rounded-l bg-violet-500'>
        <p className='subtle-regular text-white'>Save 20%</p>
      </span>
      <span className='flex-between w-4/5 rounded-r bg-violet-100 px-2'>
        <p className='subtle-regular text-violet-500'>Discount</p>
        <DiscountCountdown timestamp={time} />
      </span>
    </div>
  );
};
export default memo(DiscountBanner);
