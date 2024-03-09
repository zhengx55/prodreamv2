'use client';
import { Button } from '@/components/ui/button';
import { format_hour_diff } from '@/lib/utils';
import { ISubscription } from '@/types';
import Link from 'next/link';
import { memo } from 'react';
import { v4 } from 'uuid';

const MembershipBar = ({ membership }: { membership: ISubscription }) => {
  return (
    <div
      className={`${membership.subscription === 'basic' ? 'justify-start' : membership.subscription === 'free_trail' ? ' justify-end' : ''} mt-auto flex w-full shrink-0 items-center px-6 py-5`}
    >
      {membership.subscription === 'free_trail' ? (
        <div className='flex items-center gap-x-4'>
          <p className='text-[18px] font-medium text-doc-font'>
            Unlimited Free Trial ends in&nbsp;
            {format_hour_diff(membership.expire_time)}
          </p>
          <Link href={'/pricing'} passHref>
            <Button role='button' className='h-max rounded bg-doc-primary px-4'>
              Upgrade now
            </Button>
          </Link>
        </div>
      ) : membership.subscription === 'basic' ? (
        <div className='flex flex-col gap-y-2'>
          {membership.free_times_detail?.Document !== null &&
          membership.free_times_detail?.Document <= 0 ? (
            <>
              <div className='flex gap-x-2'>
                <div className='h-2 w-[78px] rounded-[14px] bg-red-500' />
                <div className='h-2 w-[78px] rounded-[14px] bg-red-500' />
                <div className='h-2 w-[78px] rounded-[14px] bg-red-500' />
              </div>
              <p className='base-medium text-zinc-500'>
                Max 3/3 historical documents; upgrade to &nbsp;
                <Link
                  href={'/pricing'}
                  className='text-base font-semibold leading-relaxed text-doc-primary'
                >
                  Unlimited
                </Link>
                &nbsp; for more
              </p>
            </>
          ) : (
            <>
              <div className='flex gap-x-2'>
                {Array(3 - (membership.free_times_detail?.Document ?? 0))
                  .fill(0)
                  .map((_, i) => (
                    <span
                      className='h-2 w-[78px] rounded-[14px] bg-doc-primary'
                      key={v4()}
                    />
                  ))}
                {Array(membership.free_times_detail?.Document ?? 0)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={v4()}
                      className='h-2 w-[78px] rounded-[14px] bg-gray-200'
                    />
                  ))}
              </div>
              <p className='base-medium text-zinc-500'>
                Max {membership.free_times_detail.Document}/3 historical
                documents; upgrade to &nbsp;
                <Link
                  href={'/pricing'}
                  className='text-base font-semibold leading-relaxed text-doc-primary'
                >
                  Unlimited
                </Link>
                &nbsp; for more
              </p>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default memo(MembershipBar);
