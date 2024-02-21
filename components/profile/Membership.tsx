'use client';
import { formatTimestampToDateString } from '@/lib/utils';
import { ISubscription } from '@/types';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

type Props = { membership: ISubscription };
const Membership = ({ membership }: Props) => {
  return (
    <>
      <h2 className='title-medium'>Membership</h2>
      {membership.subscription ===
      'free_trail' ? null : membership.subscription === 'basic' ? (
        <div className='flex w-max flex-col'>
          <div className='flex items-center gap-x-4'>
            <p className='text-doc-font'>
              You are on the <strong>Basic</strong> plan
            </p>
            <Link passHref href={'/pricing'}>
              <Button role='dialog' className='px-0' variant={'ghost'}>
                Go unlimited
              </Button>
            </Link>
          </div>
          <Link passHref href={'/profile/subscription'}>
            <Button role='button' className='base-regular rounded-lg'>
              Manage subscription
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className='flex items-center gap-x-4'>
            <p className='text-doc-font'>
              You are on the{' '}
              <strong>
                Unlimited{' '}
                {membership.subscription_type === 'year'
                  ? 'Annualy'
                  : 'Monthly'}{' '}
                Plan
              </strong>
            </p>
          </div>
          <p className='text-doc-font'>
            Next billing date:{' '}
            {formatTimestampToDateString(membership.expire_time, false)}
          </p>
          <Spacer y='10' />
          {membership.subscription_type !== 'year' && (
            <div className='flex w-max flex-col rounded-t-lg bg-[#FCFBFF]'>
              <div className='flex items-start gap-x-2 px-4 py-6'>
                <span className='flex-center h-5 w-5 rounded-full bg-doc-primary text-white'>
                  !
                </span>
                <p className='text-doc-font'>
                  Save $10 every month by switching to the annual plan,
                  <br />
                  <Link href={'/pricing'} className='text-doc-primary'>
                    Go annual now
                  </Link>
                </p>
              </div>
            </div>
          )}
          <Spacer y='10' />
          <Link passHref href={'/profile/subscription'}>
            <Button role='button' className='base-regular rounded-lg'>
              Manage subscription
            </Button>
          </Link>
        </>
      )}
      <Spacer y='32' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='32' />
    </>
  );
};
export default Membership;
