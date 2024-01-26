import Options from '@/components/welcome/Options';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AnimatedLayout = dynamic(
  () => import('@/components/welcome/AnimatedLayout'),
  { ssr: false }
);
export default async function Page() {
  const cookieStore = cookies();
  if (!cookieStore.get('token')) {
    redirect('/login');
  }
  const token = cookieStore.get('token')?.value;

  return (
    <AnimatedLayout>
      <div className='flex flex-col text-white'>
        <Options />
      </div>
    </AnimatedLayout>
  );
}
