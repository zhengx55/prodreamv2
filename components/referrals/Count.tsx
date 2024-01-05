'use client';

import { GiftSvg } from '../root/SvgComponents';

type Props = { count: string };

const ReferralsCount = ({ count }: Props) => {
  return (
    <div className='flex h-[340px] w-[970px] flex-col rounded-lg border border-shadow-border px-5 py-6'>
      <h2 className='title-semibold'>Current Referral Count:</h2>
      <h1 className='h2-bold'>{count} referrals</h1>
      <span className='relative mt-9 h-5 w-[800px] rounded-lg bg-shadow-border'>
        <div className='absolute -top-2 left-[calc(33%_-5.5rem)] z-10 flex w-44 flex-col items-center gap-y-2 text-center'>
          <div className='w-max rounded-full bg-primary-50 p-1'>
            <GiftSvg />
          </div>
          <p className='small-regular text-primary-200'>3 Referrals</p>
          <p className='small-regular'>
            Unlock free human expert essay review by our team!
          </p>
        </div>
        <div className='absolute -right-5 -top-2 z-10 flex w-44 flex-col items-center gap-y-2 text-center'>
          <div className='w-max rounded-full bg-primary-50 p-1'>
            <GiftSvg />
          </div>
          <p className='small-regular text-primary-200'>10 Referrals</p>
          <p className='small-regular'>
            Unlock free human expert essay review by our team!
          </p>
        </div>
        <span
          style={{
            width:
              parseInt(count) / 10 === 0
                ? '5%'
                : `${(parseInt(count) / 10) * 100}%`,
          }}
          className='absolute inset-0 z-0 h-full rounded-lg bg-gradient-to-r from-[#E3B8EE52] to-primary-200'
        />
      </span>
    </div>
  );
};

export default ReferralsCount;
