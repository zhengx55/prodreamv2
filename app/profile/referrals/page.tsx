/* eslint-disable @next/next/no-img-element */
import ReferralsCount from '@/components/referrals/Count';
import ReferralsLink from '@/components/referrals/Link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { selectUser } from '@/store/reducers/userReducer';
import { useAppSelector } from '@/store/storehooks';
import { cookies } from 'next/headers';
import Image from 'next/image';

const GiftSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
    >
      <path
        d='M11.9981 3.9873C9.05272 3.9873 6.66472 6.3753 6.66472 9.32063H5.33138C4.59538 9.32063 3.99805 9.91796 3.99805 10.654V14.654H27.9981V10.654C27.9981 9.91796 27.4007 9.32063 26.6647 9.32063H25.3314C25.3314 6.3753 22.9434 3.9873 19.9981 3.9873C18.3834 3.9873 16.9767 4.72864 15.9981 5.86198C15.0194 4.72864 13.6127 3.9873 11.9981 3.9873ZM11.9981 6.65397C13.4714 6.65397 14.6647 7.8473 14.6647 9.32063H9.33138C9.33138 7.8473 10.5247 6.65397 11.9981 6.65397ZM19.9981 6.65397C21.4714 6.65397 22.6647 7.8473 22.6647 9.32063H17.3314C17.3314 7.8473 18.5247 6.65397 19.9981 6.65397ZM5.33138 17.3206V22.6539C5.33138 25.5993 7.71938 27.9873 10.6647 27.9873H14.6647V17.3206H5.33138ZM17.3314 17.3206V27.9873H21.3314C24.2767 27.9873 26.6647 25.5993 26.6647 22.6539V17.3206H17.3314Z'
        fill='#9C2CF3'
      />
    </svg>
  );
};

export default async function Page() {
  async function fetchReferalInfos() {
    const cookieStore = cookies();
    const cookie = cookieStore.get('token');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/referral_link`,
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
    <main className='flex flex-1 flex-col overflow-y-auto md:px-16 md:py-10'>
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
