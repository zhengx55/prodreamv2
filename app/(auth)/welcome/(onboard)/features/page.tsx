import Spacer from '@/components/root/Spacer';
import Options from '@/components/welcome/Options';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const AnimatedLayout = dynamic(
  () => import('@/components/welcome/AnimatedLayout'),
  { ssr: false }
);

export default async function Page() {
  const cookieStore = cookies();
  if (!cookieStore.get('token')) {
    redirect('/signup');
  }
  const token = cookieStore.get('token')?.value;

  return (
    <AnimatedLayout>
      <div className='relative w-full bg-[#fff] px-[200px] py-[100px]'>
      <div className='absolute right-[137px] text-[#8551F3] font-[500] text-[18px] top-[-100px] flex items-center gap-x-1'>
          <Link href={'/writtingpal/polish'}>Skip for now</Link>
        </div>
        <Options type='onboard' />
      </div>
    </AnimatedLayout>
  );
}
