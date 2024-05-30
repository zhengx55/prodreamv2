import MembershipHistory from '@/components/profile/MembershipHistory';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatTimestampToDateString } from '@/lib/utils';
import { ISubsciptionHistory, ISubscription } from '@/types';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Link from 'next/link';
const UnsubscribeModal = dynamic(
  () => import('@/components/profile/UnsubscribeModal'),
  { ssr: false }
);
async function getMembership(): Promise<ISubscription> {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/balance`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch balance');
  const data = await res.json();
  if (data.code !== 0) throw new Error('Failed to fetch balance');
  return data.data;
}

async function getHistory(): Promise<ISubsciptionHistory[]> {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/orders`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch balance');
  const data = await res.json();
  if (data.code !== 0) throw new Error('Failed to fetch balance');
  return data.data;
}

export default async function Page({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const t = useTranslations('Profile');
  const membership = await getMembership();
  const history = await getHistory();
  return (
    <main className='flex h-full w-full flex-col overflow-y-auto px-10 py-5'>
      <h1 className='title-medium'>Membership Details</h1>
      <Spacer y='20' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='40' />
      <h2 className='title-medium'>Current Plan</h2>
      {membership.subscription === 'basic' ||
      membership.subscription === 'free_trail' ? (
        <div className='flex w-max flex-col'>
          <div className='flex items-center gap-x-4'>
            <p className='text-neutral-400'>
              You are on the <strong>Basic</strong> Plan
            </p>
            <Link passHref href={`/${params.lang}/pricing`}>
              <Button role='dialog' className='px-0' variant={'ghost'}>
                Go unlimited
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Spacer y='5' />
          <div className='flex items-center gap-x-4'>
            <p className='text-neutral-400'>
              You are on the&nbsp;
              <strong>
                Unlimited&nbsp;
                {membership.subscription_type === 'year' ? 'Annual' : 'Monthly'}
                &nbsp; Plan
              </strong>
            </p>
            {membership.subscription_id && (
              <UnsubscribeModal subscription_id={membership.subscription_id}>
                <Button role='dialog' variant={'ghost'} className='p-0'>
                  Unsubscribe
                </Button>
              </UnsubscribeModal>
            )}
          </div>
          <Spacer y='5' />
          {membership.subscription_id ? (
            <p className='text-neutral-400'>
              Next billing date:&nbsp;
              {formatTimestampToDateString(membership.expire_time, false)}
            </p>
          ) : (
            <p className='text-neutral-400'>
              Active Until:&nbsp;
              {formatTimestampToDateString(membership.expire_time, false)}
            </p>
          )}
          <Spacer y='10' />
          {membership.subscription_type === 'month' && (
            <div className='flex w-max flex-col rounded-lg bg-[#FCFBFF] px-4 py-6'>
              <div className='flex items-start gap-x-2 '>
                <span className='flex-center h-5 w-5 rounded-full bg-violet-500 text-white'>
                  !
                </span>
                <p className='small-regular text-neutral-400'>
                  Save $10 every month by switching to the annual plan,
                  <br />
                  <Link
                    href={`/${params.lang}/pricing`}
                    className='text-violet-500'
                  >
                    Go annual now
                  </Link>
                </p>
              </div>
            </div>
          )}
        </>
      )}
      <Spacer y='32' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='32' />
      <MembershipHistory history={history} />
    </main>
  );
}
