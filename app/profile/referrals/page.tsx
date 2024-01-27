import ReferralsCount from '@/components/referrals/Count';
import ReferralsLink from '@/components/referrals/Link';
import { Separator } from '@/components/ui/separator';
import { cookies } from 'next/headers';

export default async function Page() {
  async function fetchReferalInfos() {
    const cookieStore = cookies();
    const cookie = cookieStore.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/referral_link`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      }
    );

    const count_res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/referral_count`,
      {
        headers: {
          Authorization: `Bearer ${cookie?.value}`,
        },
      }
    );
    const link_data = await res.json();
    const count_data = await count_res.json();
    return { link: link_data.data, count: count_data.data };
  }

  const { link, count } = await fetchReferalInfos();

  return (
    <main className='flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col overflow-y-auto px-16 py-10'>
      <h1 className='h2-bold'>Referrals</h1>
      <Separator orientation='horizontal' className='mt-7 bg-shadow-border' />
      <div className='flex flex-col gap-y-8 pt-8'>
        <div className='flex w-max flex-col gap-y-3 rounded-lg bg-shadow-50 px-5 py-6'>
          <h2 className='base-semibold'>
            Refer your friends and unlock free essay review & college advising
            sessions!
          </h2>
          <p className='base-regular text-shadow-100'>
            Your essay will be reviewed by our founding team, who are recent
            alumnus from
            <span className='text-primary-200'>
              &nbsp; Harvard, Stanford,
              <br /> Columbia and UCLA,
            </span>
            &nbsp; and have helped hundreds of students got into top 50 schools
          </p>
        </div>
        <h2 className='base-semibold'>Your Referral Link</h2>
        <p className='small-regular'>Your unique referral link for signups</p>
        <ReferralsLink link={link} />
        <ReferralsCount count={count} />
      </div>
    </main>
  );
}
