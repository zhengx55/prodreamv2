import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { profileResetName } from '@/query/api';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

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
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    if (!firstname || !lastname) {
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/name?last_name=${lastname}&first_name=${firstname}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (data.code === 0) redirect('/welcome/features');
  };
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
          <p className='title-regular'>
            Hi there! I&apos;m Max, the CEO of ProDream and your guide in the
            world of college admissions. Together, we&apos;ll navigate the
            complexities of getting into your dream college. 💪🏻
          </p>
          <Spacer y='64' />
          <p className='title-semibold'>
            To get started, may I know your name?
          </p>
          <Spacer y='32' />
          <form action={handleSubmit} className='flex flex-1 flex-col'>
            <div className='flex gap-x-4'>
              <div className='flex w-1/2 flex-col gap-y-4'>
                <label className='base-semibold' htmlFor='firstname'>
                  First Name/Preferred Name
                </label>
                <Input
                  id='firstname'
                  name='firstname'
                  type='text'
                  className=' w-full border-shadow-border bg-transparent'
                  required
                />
              </div>
              <div className='flex w-1/2 flex-col gap-y-4'>
                <label className='base-semibold' htmlFor='lastname'>
                  Last Name
                </label>
                <Input
                  id='lastname'
                  name='lastname'
                  type='text'
                  className=' w-full border-shadow-border bg-transparent'
                  required
                />
              </div>
            </div>
            <Button type='submit' className='mt-auto self-end'>
              Next
            </Button>
          </form>
        </div>
      </div>
    </AnimatedLayout>
  );
}
