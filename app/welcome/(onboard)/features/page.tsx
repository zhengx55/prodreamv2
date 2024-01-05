import Spacer from '@/components/root/Spacer';
import Options from '@/components/welcome/Options';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AnimatedLayout = dynamic(
  () => import('@/components/welcome/AnimatedLayout')
);

export default async function Page() {
  const cookieStore = cookies();
  if (!cookieStore.get('token')) {
    redirect('/signup');
  }
  const token = cookieStore.get('token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}refresh`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await res.json()).data;

  return (
    <AnimatedLayout>
      <div className='flex flex-col text-white'>
        <p className='title-semibold'>2/2</p>
        <Spacer y='16' />
        <Options type='onboard' firstname={data.first_name} />
      </div>
    </AnimatedLayout>
  );
}
