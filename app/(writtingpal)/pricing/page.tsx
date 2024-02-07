import Spacer from '@/components/root/Spacer';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

const Plan = dynamic(() => import('@/components/pricing/Plan'));
const QA = dynamic(() => import('@/components/pricing/QA'));
const Tab = dynamic(() => import('@/components/pricing/Tab'));

export default async function Page() {
  const token = cookies().get('token')?.value;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/payment/balance`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const res = await data.json();
  console.log(res);
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <Spacer y='50' />
      <h1 className='text-center text-[40px] font-medium'>Plans & Pricing</h1>
      <Spacer y='10' />
      <p className='base-regular text-center text-doc-font'>
        Select the perfect plan to enhance your academic writing journey
      </p>
      <Spacer y='10' />
      <Tab />
      <Spacer y='100' />
      <Plan />
      <Spacer y='100' />
      <QA />
      <Spacer y='100' />
    </main>
  );
}
