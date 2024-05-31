'use client';
import { Button } from '@/components/ui/button';
import { format_hour_diff } from '@/lib/utils';
import { FreeTimesDetail, ISubscription } from '@/types';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { memo } from 'react';

const TrialEnds = ({ expireTime }: { expireTime: number }) => {
  const t = useTranslations('Editor');
  const { lang } = useParams();

  const expireTimeString = format_hour_diff(expireTime, lang as string);
  return (
    <div className='flex items-center gap-x-4'>
      <p className='text-[18px] font-medium text-neutral-400'>
        {t('MembershipBar.Unlimited_Free_Trial_ends_in', { expireTimeString })}
      </p>
      <Link href='/pricing' passHref>
        <Button role='button' className='h-max rounded bg-violet-500 px-4'>
          {t('MembershipBar.Upgrade_now')}
        </Button>
      </Link>
    </div>
  );
} 

const BasicMembership = ({ freeTimesDetail }: { freeTimesDetail: FreeTimesDetail }) => {
  const document_count = Math.max(0, freeTimesDetail?.Document ?? 0);
  const filledBars = Array(3 - document_count).fill(0);
  const emptyBars = Array(document_count).fill(0);
  const t = useTranslations('Editor');

  const Unlimited = t('MembershipBar.Unlimited');

  const unlimitedLink = (
    <Link
      href='/pricing'
      passHref
      className='text-base font-semibold leading-relaxed text-violet-500'
    >
      {Unlimited}
    </Link>
  )


  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex gap-x-2'>
        {filledBars.map((_, i) => (
          <span className='h-2 w-[78px] rounded-[14px] bg-violet-500' key={i} />
        ))}
        {emptyBars.map((_, i) => (
          <span
            className='h-2 w-[78px] rounded-[14px] bg-gray-200'
            key={`empty-${i}`}
          />
        ))}
      </div>
      <p className='base-medium text-zinc-500'>
        {t.rich('MembershipBar.MaxHistoricalLimitHint', { 
            FilledBarsNumber: filledBars.length,
            UnlimitedLink: () => unlimitedLink,
            Unlimited: Unlimited
        })}
      </p>
    </div>
  );
};

const MembershipBar = ({ membership }: { membership: ISubscription }) => {
  const justifyClass =
    membership.subscription === 'basic'
      ? 'justify-start'
      : membership.subscription === 'free_trail'
        ? 'justify-end'
        : '';

  return (
    <div
      className={`mt-auto flex w-full shrink-0 items-center px-6 py-5 ${justifyClass}`}
    >
      {membership.subscription === 'free_trail' &&
        <TrialEnds expireTime={membership.expire_time} />  
      }
      {membership.subscription === 'basic' &&
        <BasicMembership freeTimesDetail={membership.free_times_detail} />}
    </div>
  );
};
export default memo(MembershipBar);
