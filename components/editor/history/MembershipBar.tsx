'use client';
import { Button } from '@/components/ui/button';
import { useMembershipInfo } from '@/query/query';
import Link from 'next/link';

type Props = {};
const MembershipBar = (props: Props) => {
  const { data, isPending, isError } = useMembershipInfo();
  if (isPending || isError) return null;
  return (
    <div
      className={`mt-auto flex w-full shrink-0 items-center px-6 py-5 ${data.subscription !== 'basic' ? 'justify-start' : 'justify-end'}`}
    >
      {data.subscription !== 'basic' ? (
        <div className='flex flex-col gap-y-2'>
          <span></span>
          <p className='small-medium text-doc-font'>
            Max 2/3 historical documents; upgrade to&nbsp;
            <Link href={'/pricing'} className='text-doc-primary'>
              Unlimited
            </Link>
            &nbsp;for more
          </p>
        </div>
      ) : (
        <div className='flex items-center gap-x-4'>
          <p className='text-[18px] font-medium text-doc-font'>
            You are on the <strong>Unlimited Monthly Pack</strong>
          </p>
          <Button role='button' className='h-max rounded bg-doc-primary px-4'>
            Go annual -50%
          </Button>
        </div>
      )}
    </div>
  );
};
export default MembershipBar;
