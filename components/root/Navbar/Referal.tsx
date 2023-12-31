import Link from 'next/link';
import { memo } from 'react';
import { GiftSvg } from '../SvgComponents';

const Referal = () => {
  return (
    <div className='rounded-lg bg-referal px-[1px] py-[1px]'>
      <Link
        href={'/profile/referrals'}
        passHref
        className='block cursor-pointer rounded-lg bg-white px-3 py-1'
      >
        <div className='flex-between gap-x-2'>
          <p className='small-semibold'>
            Refer friends to redeem
            <span className='text-primary-200'>&nbsp;free&nbsp;</span>
            expert
            <br /> 1-on-1 advising session ✨
          </p>
          <div className='flex items-center'>
            <span className='relative z-0 -mr-2 h-4 w-[120px] rounded-lg bg-primary-50'>
              <span className='absolute inset-0 w-1/2 rounded-lg bg-gradient-to-r from-[#E3B8EE52] to-primary-200'></span>
            </span>
            <span className='flex-center z-10 h-7 w-7 rounded-full bg-primary-50'>
              <GiftSvg />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(Referal);
