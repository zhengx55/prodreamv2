import { formatTimestampToDateString } from '@/lib/utils';
import { ISubscription } from '@/types';
import Link from 'next/link';
import PromoCode from '../editor/modal/PromoCode';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Membership = ({ membership }: { membership: ISubscription }) => {
  return (
    <>
      <h2 className='title-medium'>Membership</h2>
      <Spacer y='5' />
      {membership.subscription === 'basic' ||
      membership.subscription === 'free_trail' ? (
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
          <Spacer y='5' />
          <div className='flex gap-x-2'>
            <PromoCode>
              <Button
                role='dialog'
                className='rounded-lg border border-neutral-400 text-zinc-600'
                variant={'ghost'}
              >
                Promo Code
              </Button>
            </PromoCode>

            <Link passHref href={'/profile/subscription'}>
              <Button role='button' className='base-regular rounded-lg'>
                Manage subscription
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className='flex items-center gap-x-4'>
            <p className='text-doc-font'>
              You are on the&nbsp;
              <strong>
                Unlimited&nbsp;
                {membership.subscription_type === 'year' ? 'Annual' : 'Monthly'}
                &nbsp; Plan
              </strong>
            </p>
          </div>
          <Spacer y='5' />
          {membership.subscription_id ? (
            <p className='text-doc-font'>
              Next billing date:&nbsp;
              {formatTimestampToDateString(membership.expire_time, false)}
            </p>
          ) : (
            <p className='text-doc-font'>
              Active Until:&nbsp;
              {formatTimestampToDateString(membership.expire_time, false)}
            </p>
          )}

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
