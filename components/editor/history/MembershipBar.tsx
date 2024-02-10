'use client';
import { Button } from '@/components/ui/button';
import { useMembershipInfo } from '@/query/query';
import Link from 'next/link';
import { memo } from 'react';
import { v4 } from 'uuid';

type Props = { document_count: number };
const MembershipBar = ({ document_count }: Props) => {
  const { data, isPending, isError } = useMembershipInfo();
  if (isPending || isError) return null;
  return (
    <div
      className={`mt-auto flex w-full shrink-0 items-center px-6 py-5 ${data.subscription === 'basic' ? 'justify-start' : 'justify-end'}`}
    >
      {data.subscription === 'basic' ? (
        document_count >= 3 ? (
          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center gap-x-2'>
              <span className='h-2 w-20 rounded-2xl bg-red-400' />
              <span className='h-2 w-20 rounded-2xl bg-red-400' />
              <span className='h-2 w-20 rounded-2xl bg-red-400' />
            </div>
            <p className='small-medium text-doc-font'>
              Max 3/3 historical documents; upgrade to&nbsp;
              <Link href={'/pricing'} className='text-doc-primary'>
                Unlimited
              </Link>
              &nbsp;for more
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center gap-x-2'>
              {Array(document_count)
                .fill(0)
                .map(() => {
                  return (
                    <span
                      key={v4()}
                      className='h-2 w-20 rounded-2xl bg-doc-primary'
                    />
                  );
                })}
              {Array(3 - document_count)
                .fill(0)
                .map(() => {
                  return (
                    <span
                      key={v4()}
                      className='h-2 w-20 rounded-2xl bg-[#EAEAEA]'
                    />
                  );
                })}
            </div>
            <p className='small-medium text-doc-font'>
              Max 2/3 historical documents; upgrade to&nbsp;
              <Link href={'/pricing'} className='text-doc-primary'>
                Unlimited
              </Link>
              &nbsp;for more
            </p>
          </div>
        )
      ) : (
        <div className='flex items-center gap-x-4'>
          <p className='text-[18px] font-medium text-doc-font'>
            You are on the <strong>Unlimited Monthly Pack</strong>
          </p>
          <Link href={'/pricing'} passHref>
            <Button role='button' className='h-max rounded bg-doc-primary px-4'>
              Go annual -50%
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default memo(MembershipBar);
