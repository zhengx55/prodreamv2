'use client';
import { Button } from '@/components/ui/button';
import { format_hour_diff } from '@/lib/utils';
import { FreeTimesDetail, ISubscription } from '@/types';
import Link from 'next/link';
import { memo } from 'react';

const renderTrialEnds = (expireTime: number) => (
  <div className='flex items-center gap-x-4'>
    <p className='text-[18px] font-medium text-doc-font'>
      Unlimited Free Trial ends in {format_hour_diff(expireTime)}
    </p>
    <Link href='/pricing' passHref>
      <Button role='button' className='h-max rounded bg-doc-primary px-4'>
        Upgrade now
      </Button>
    </Link>
  </div>
);

const renderBasicMembership = (freeTimesDetail: FreeTimesDetail) => {
  const filledBars = Array(3 - (freeTimesDetail?.Document ?? 0)).fill(0);
  const emptyBars = Array(freeTimesDetail?.Document ?? 0).fill(0);

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex gap-x-2'>
        {filledBars.map((_, i) => (
          <span
            className='h-2 w-[78px] rounded-[14px] bg-doc-primary'
            key={i}
          />
        ))}
        {emptyBars.map((_, i) => (
          <span
            className='h-2 w-[78px] rounded-[14px] bg-gray-200'
            key={`empty-${i}`}
          />
        ))}
      </div>
      <p className='base-medium text-zinc-500'>
        Max {filledBars.length}/3 historical documents; upgrade to&nbsp;
        <Link
          href='/pricing'
          passHref
          className='text-base font-semibold leading-relaxed text-doc-primary'
        >
          Unlimited
        </Link>
        &nbsp;for more
      </p>
    </div>
  );
};

const MembershipBar = ({ membership }: { membership: ISubscription }) => {
  const justifyClass =
    membership.subscription === 'basic'
      ? 'justify-start'
      : membership.subscription === 'free_trail'
        ? 'justify-end'
        : '';

  return (
    <div
      className={`mt-auto flex w-full shrink-0 items-center px-6 py-5 ${justifyClass}`}
    >
      {membership.subscription === 'free_trail' &&
        renderTrialEnds(membership.expire_time)}
      {membership.subscription === 'basic' &&
        renderBasicMembership(membership.free_times_detail)}
    </div>
  );
};
export default memo(MembershipBar);
