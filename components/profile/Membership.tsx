import { formatTimestampToDateString } from '@/lib/utils';
import { DocPageDicType, ISubscription } from '@/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import PromoCode from '../editor/modal/PromoCode';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Membership = ({
  membership,
  lang,
  t,
}: { membership: ISubscription } & DocPageDicType) => {
  const trans = useTranslations('Profile');
  const transCommonSense = useTranslations('CommonSense');
  const monthNames = [
    transCommonSense('Month.Jan'),
    transCommonSense('Month.Feb'),
    transCommonSense('Month.Mar'),
    transCommonSense('Month.Apr'),
    transCommonSense('Month.May'),
    transCommonSense('Month.Jun'),
    transCommonSense('Month.Jul'),
    transCommonSense('Month.Aug'),
    transCommonSense('Month.Sep'),
    transCommonSense('Month.Oct'),
    transCommonSense('Month.Nov'),
    transCommonSense('Month.Dec'),
  ];

  const Basic = trans('Setting.Basic');
  const Unlimited = trans('Setting.Unlimited');
  const Annual = trans('Setting.Annual');
  const Monthly = trans('Setting.Monthly');

  return (
    <>
      <h2 className='title-medium'>{trans('Setting.Membership')}</h2>
      <Spacer y='5' />
      {membership.subscription === 'basic' ||
      membership.subscription === 'free_trail' ? (
        <div className='flex w-max flex-col'>
          <div className='flex items-center gap-x-4'>
            <p className='text-neutral-400'>
              {trans.rich('Setting.Your_current_plan', {
                CurrentPlan: Basic,
                strong: (chunks: any) => <strong>{chunks}</strong>,
              })}
            </p>
            <Link passHref href={`/${lang}/pricing`}>
              <Button role='dialog' className='px-0' variant={'ghost'}>
                {trans('Setting.Go_unlimited')}
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
                {trans('Setting.Promo_code')}
              </Button>
            </PromoCode>

            <Link passHref href={`/${lang}/profile/subscription`}>
              <Button role='button' className='base-regular rounded-lg'>
                {trans('Setting.Manage_subscription')}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className='flex items-center gap-x-4'>
            <p className='text-neutral-400'>
              {/* You are on the&nbsp;
                <strong>
                  Unlimited&nbsp;
                  {membership.subscription_type === 'year' ? Annual : Monthly}
                  &nbsp; Plan
                </strong> */}

              {trans.rich('Setting.Your_current_plan', {
                CurrentPlan:
                  membership.subscription_type === 'year' ? Annual : Monthly,
                strong: (chunks: any) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
          <Spacer y='5' />
          {membership.subscription_id ? (
            <p className='text-neutral-400'>
              {trans('Setting.Next_billing_date')}:&nbsp;
              {formatTimestampToDateString(
                membership.expire_time,
                false,
                monthNames
              )}
            </p>
          ) : (
            <p className='text-neutral-400'>
              {trans('Setting.Active_Until')}:&nbsp;
              {formatTimestampToDateString(
                membership.expire_time,
                false,
                monthNames
              )}
            </p>
          )}

          <Spacer y='10' />
          {membership.subscription_type !== 'year' && (
            <div className='flex w-max flex-col rounded-t-lg bg-[#FCFBFF]'>
              <div className='flex items-start gap-x-2 px-4 py-6'>
                <span className='flex-center h-5 w-5 rounded-full bg-violet-500 text-white'>
                  !
                </span>
                <p className='text-neutral-400'>
                  Save $10 every month by switching to the annual plan,
                  <br />
                  <Link href={'/pricing'} className='text-violet-500'>
                    Go annual now
                  </Link>
                </p>
              </div>
            </div>
          )}
          <Spacer y='10' />
          <Link passHref href={`/${lang}/profile/subscription`}>
            <Button role='button' className='base-regular rounded-lg'>
              {trans('Setting.Manage_subscription')}
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
