import Spacer from '@/components/root/Spacer';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const AnimatedLayout = dynamic(
  () => import('@/components/welcome/AnimatedLayout')
);

const TypingBanner = dynamic(
  () => import('@/components/features/TypingBanner')
);

export default async function Page() {
  const cookieStore = cookies();
  if (!cookieStore.get('token')) {
    redirect('/signup');
  }
  return (
    <AnimatedLayout>
      <div className='flex h-max gap-x-8'>
        <div className='rounded-lg bg-black-200/50 px-12 pt-20 md:h-[500px] md:w-[390px]'>
          <Image
            src='/welcome/maxWelcome.png'
            alt='welcome'
            width={1000}
            height={1000}
            className='h-full w-full'
            priority
          />
        </div>
        <div className='flex h-[500px] max-w-[700px] flex-col self-start text-white'>
          <p className='title-semibold'>1/2</p>
          <Spacer y='16' />
          <h1 className='h2-bold'>Welcome to ProDream! ✨</h1>
          <Spacer y='16' />
          <TypingBanner />
        </div>
      </div>
    </AnimatedLayout>
  );
}
