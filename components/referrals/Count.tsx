'use client';

type Props = { count: string };

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

const ReferralsCount = ({ count }: Props) => {
  return (
    <div className='flex h-[340px] w-[970px] flex-col rounded-lg border border-shadow-border px-5 py-6'>
      <h2 className='title-semibold'>Current Referral Count:</h2>
      <h1 className='h2-bold'>{count} referrals</h1>
      <span className='relative mt-9 h-5 w-[800px] rounded-lg bg-shadow-border'>
        <div className='absolute -top-2 left-[calc(33%_-5.5rem)] z-10 flex w-44 flex-col items-center gap-y-2 text-center'>
          <div className='w-max rounded-full bg-primary-50 p-1'>
            <GiftSvg />
          </div>
          <p className='small-regular text-primary-200'>3 Referrals</p>
          <p className='small-regular'>
            Unlock free human expert essay review by our team!
          </p>
        </div>
        <div className='absolute -right-5 -top-2 z-10 flex w-44 flex-col items-center gap-y-2 text-center'>
          <div className='w-max rounded-full bg-primary-50 p-1'>
            <GiftSvg />
          </div>
          <p className='small-regular text-primary-200'>10 Referrals</p>
          <p className='small-regular'>
            Unlock free human expert essay review by our team!
          </p>
        </div>
        <span
          style={{
            width:
              parseInt(count) / 10 === 0
                ? '5%'
                : `${(parseInt(count) / 10) * 100}%`,
          }}
          className='absolute inset-0 z-0 h-full rounded-lg bg-gradient-to-r from-[#E3B8EE52] to-primary-200'
        />
      </span>
    </div>
  );
};

export default ReferralsCount;
