'use client';
type Props = { count: string };

const ReferralsCount = ({ count }: Props) => {
  return (
    <div className='flex h-[340px] w-[970px] flex-col rounded-lg border border-shadow-border px-5 py-6'>
      <h2 className='title-semibold'>Current Referral Count:</h2>
      <h1 className='h2-bold'>{count} referrals</h1>
    </div>
  );
};

export default ReferralsCount;
