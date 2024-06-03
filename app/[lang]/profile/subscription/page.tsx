import MembershipHistory from '@/components/profile/MembershipHistory';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatTimestampToDateString } from '@/lib/utils';
import { ISubsciptionHistory, ISubscription } from '@/types';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Link from 'next/link';
const UnsubscribeModal = dynamic(
  () => import('@/components/profile/UnsubscribeModal'),
  { ssr: false }
);
async function getMembership(): Promise<ISubscription> {
  const trans = await getTranslations('Profile');
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/balance`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error(trans('Subscription.Failed_to_fetch_balance'));
  const data = await res.json();
  if (data.code !== 0)
    throw new Error(trans('Subscription.Failed_to_fetch_balance'));
  return data.data;
}

async function getHistory(): Promise<ISubsciptionHistory[]> {
  const trans = await getTranslations('Profile');
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/orders`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error(trans('Subscription.Failed_to_fetch_balance'));
  const data = await res.json();
  if (data.code !== 0)
    throw new Error(trans('Subscription.Failed_to_fetch_balance'));
  return data.data;
}

export default async function Page({
  params,
}: {
  params: { id: string; lang: string };
}) {
  unstable_setRequestLocale(params.lang);
  const { id, lang } = params;
  const trans = await getTranslations('Profile');
  const membership = await getMembership();
  const history = await getHistory();

  const Basic = trans('Setting.Basic');
  const Unlimited = trans('Setting.Unlimited');
  const Annual = trans('Setting.Annual');
  const Monthly = trans('Setting.Monthly');

  return (
    <main className='flex h-full w-full flex-col overflow-y-auto px-10 py-5'>
      <h1 className='title-medium'>
        {trans('Subscription.Membership_Details')}
      </h1>
      <Spacer y='20' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='40' />
      <h2 className='title-medium'>{trans('Subscription.Current_Plan')}</h2>
      {membership.subscription === 'basic' ||
      membership.subscription === 'free_trail' ? (
        <div className='flex w-max flex-col'>
          <div className='flex items-center gap-x-4'>
            <p className='text-neutral-400'>
              {trans.rich('Subscription.Your_current_plan', {
                CurrentPlan: Basic,
                strong: (chunks: any) => <strong>{chunks}</strong>,
              })}
            </p>
            <Link passHref href={`/${lang}/pricing`}>
              <Button role='dialog' className='px-0' variant={'ghost'}>
                {trans('Subscription.Go_unlimited')}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Spacer y='5' />
          <div className='flex items-center gap-x-4'>
            <p className='text-neutral-400'>
              {trans.rich('Setting.Your_current_plan', {
                CurrentPlan:
                  membership.subscription_type === 'year' ? Annual : Monthly,
                strong: (chunks: any) => <strong>{chunks}</strong>,
              })}
            </p>
            {membership.subscription_id && (
              <UnsubscribeModal subscription_id={membership.subscription_id}>
                <Button role='dialog' variant={'ghost'} className='p-0'>
                  {trans('Subscription.Unsubscribe')}
                </Button>
              </UnsubscribeModal>
            )}
          </div>
          <Spacer y='5' />
          {membership.subscription_id ? (
            <p className='text-neutral-400'>
              {trans('Subscription.Next_billing_date')}:&nbsp;
              {formatTimestampToDateString(membership.expire_time, false, lang)}
            </p>
          ) : (
            <p className='text-neutral-400'>
              {trans('Subscription.Active_Until')}:&nbsp;
              {formatTimestampToDateString(membership.expire_time, false, lang)}
            </p>
          )}
          <Spacer y='10' />
          {membership.subscription_type === 'month' && (
            <div className='flex w-max flex-col rounded-lg bg-[#FCFBFF] px-4 py-6'>
              <div className='flex items-start gap-x-2 '>
                <span className='flex-center h-5 w-5 rounded-full bg-violet-500 text-white'>
                  !
                </span>
                <p className='small-regular text-neutral-4000'>
                  {trans(
                    'Subscription.Save_$10_every_month_by_switching_to_the_annual_plan'
                  )}
                  <br />
                  <Link href={`/${lang}/pricing`} className='text-violet-500'>
                    {trans('Subscription.Go_annual_now')}
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
