import Tab from '@/components/pricing/Tab';
import Spacer from '@/components/root/Spacer';
import { Diamond } from '@/components/root/SvgComponents';
import { IDiscount, ISubscription } from '@/types';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const Plan = dynamic(() => import('@/components/pricing/Plan'));
const QA = dynamic(() => import('@/components/pricing/QA'));
async function getBalance() {
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

async function getDiscountInfo() {
  const token = cookies().get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/referral_discount`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch coupon');
  const data = await res.json();
  if (data.code !== 0) throw new Error('Failed to fetch coupon');
  return data.data;
}

export default async function Page() {
  const membership: ISubscription = await getBalance();
  const discount_info: IDiscount = await getDiscountInfo();
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <div className='flex-center absolute top-0 h-10 w-full gap-x-2 bg-zinc-700'>
        <Diamond />
        <p className='subtle-regular text-white'>
          Upgrade to Unlimited to unlock unlimited possibilities
        </p>
      </div>
      <Spacer y='80' />
      <h1 className='text-center text-[40px] font-medium'>Plans & Pricing</h1>
      <Spacer y='10' />
      <p className='base-regular text-center text-neutral-400'>
        Select the perfect plan to enhance your academic writing journey
      </p>
      <Spacer y='10' />
      <Tab membership={membership} discount={discount_info} />
      <Spacer y='100' />
    </main>
  );
}
