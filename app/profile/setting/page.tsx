import Membership from '@/components/profile/Membership';
import Setting from '@/components/profile/Setting';
import Verification from '@/components/profile/Verification';
import { ISubscription } from '@/types';
import { cookies } from 'next/headers';

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
    <main className='flex h-full w-full flex-col overflow-y-auto px-10 py-5'>
      <Setting />
      <Membership membership={membership} />
      <Verification />
    </main>
  );
}
