'use client';
import { Button } from '@/components/ui/button';
import { format_hour_diff } from '@/lib/utils';
import { useMembershipInfo } from '@/query/query';
import Link from 'next/link';
import { memo } from 'react';

const MembershipBar = () => {
  const { data, isPending, isError } = useMembershipInfo();
  if (isPending || isError) return null;
  return (
    <div
      className={`mt-auto flex w-full shrink-0 items-center justify-end px-6 py-5`}
    >
      {data.subscription === 'free_trail' ? (
        <div className='flex items-center gap-x-4'>
          <p className='text-[18px] font-medium text-doc-font'>
            Unlimited Free Trial ends in {format_hour_diff(data.expire_time)}
          </p>
          <Link href={'/pricing'} passHref>
            <Button role='button' className='h-max rounded bg-doc-primary px-4'>
              Upgrade now
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
export default memo(MembershipBar);
