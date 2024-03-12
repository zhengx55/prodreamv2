import Spacer from '@/components/root/Spacer';
import { ISubscription } from '@/types';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const Plan = dynamic(() => import('@/components/pricing/Plan'));
const QA = dynamic(() => import('@/components/pricing/QA'));
const Tab = dynamic(() => import('@/components/pricing/Tab'));

export default async function Page() {
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
  const membership: ISubscription = data.data;
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <Spacer y='50' />
      <h1 className='text-center text-[40px] font-medium'>Plans & Pricing</h1>
      <Spacer y='10' />
      <p className='base-regular text-center text-doc-font'>
        Select the perfect plan to enhance your academic writing journey
      </p>
      <Spacer y='10' />
      <Tab membership={membership} />
      <Spacer y='100' />
    </main>
  );
}
