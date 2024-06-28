import { formatTimestampToDateString } from '@/lib/utils';
import { DocPageDicType, ISubscription } from '@/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import PromoCode from '../editor/modal/PromoCode';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const MembershipCN = ({
  membership,
  lang,
  t,
}: { membership: ISubscription } & DocPageDicType) => {
  const trans = useTranslations('Profile');
  const transCommonSense = useTranslations('CommonSense');
  const monthNames = [
    transCommonSense('Month.January'),
    transCommonSense('Month.February'),
    transCommonSense('Month.March'),
    transCommonSense('Month.April'),
    transCommonSense('Month.May'),
    transCommonSense('Month.June'),
    transCommonSense('Month.July'),
    transCommonSense('Month.August'),
    transCommonSense('Month.September'),
    transCommonSense('Month.October'),
    transCommonSense('Month.November'),
    transCommonSense('Month.December'),
  ];

  const Basic = trans('Setting.Basic');
  const Unlimited = trans('Setting.Unlimited');
  const Annual = trans('Setting.Annual');
  const Monthly = trans('Setting.Monthly');

  return (
    <>
      <h2 className='flex items-center text-base font-normal text-[#202020]'>
        <span>{trans('Setting.Membership')}</span>

        <Link passHref href={`/${lang}/pricing`}>
          <Button
            role='dialog'
            className='px-6 text-sm font-normal leading-normal'
            variant={'ghost'}
          >
            {trans('Setting.Go_unlimited')}
          </Button>
        </Link>
      </h2>
      <Spacer y='5' />
      {membership.subscription === 'basic' ||
      membership.subscription === 'free_trail' ? (
        <div className='flex w-2/3 items-center'>
          <div className='flex w-full items-center justify-between gap-x-4'>
            <div className='flex items-center gap-x-4'>
              <p className='text-neutral-400'>
                {trans.rich('Setting.Your_current_plan', {
                  CurrentPlan: Basic,
                  strong: (chunks: any) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>

            <div className='flex -translate-y-5 items-center gap-x-2'>
              <PromoCode>
                <Button
                  role='dialog'
                  className='inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-400 px-8 py-2 text-center text-sm font-normal leading-normal tracking-[0.175px] text-[#ADA9AE] no-underline'
                  variant={'ghost'}
                >
                  {trans('Setting.Promo_code')}
                </Button>
              </PromoCode>

              <Link passHref href={`/${lang}/profile/subscription`}>
                <Button
                  role='button'
                  className='inline-flex items-center justify-center gap-2 rounded-lg border border-[#8551F3] bg-[#8551F3] px-8 py-2 text-white'
                >
                  {trans('Setting.Manage_subscription')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='flex w-2/3 items-center gap-x-4'>
            <p className='text-neutral-400'>
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
          <Link passHref href={`/${lang}/profile/subscription`}>
            <Button role='button' className='base-regular rounded-lg'>
              {trans('Setting.Manage_subscription')}
            </Button>
          </Link>
        </>
      )}
      <Spacer y='25' />
      <Separator orientation='horizontal' className='w-2/3 bg-shadow-border' />
      <Spacer y='32' />
    </>
  );
};
export default MembershipCN;
