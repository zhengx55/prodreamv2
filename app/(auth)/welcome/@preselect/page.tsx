import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Page() {
  return (
    <section className='flex-center flex flex-1'>
      <div className='flex h-max gap-x-8'>
        <div className='rounded-lg bg-black-200/50 px-12 pt-20 md:h-[500px] md:w-[390px]'>
          <Image
            src='/maxWelcome.png'
            alt='welcome'
            width={1000}
            height={1000}
            className='h-full w-full'
            priority
          />
        </div>
        <div className='flex h-[500px] max-w-[700px] flex-col self-start text-white'>
          <p>1/2</p>
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
          <Spacer y='16' />
          <div className='flex gap-x-4'>
            <div className='flex w-1/2 flex-col gap-y-4'>
              <label className='base-semibold' htmlFor='firstname'>
                First Name/Preferred Name
              </label>
              <Input
                id='firstname'
                className=' w-full border-shadow-border bg-transparent'
              />
            </div>
            <div className='flex w-1/2 flex-col gap-y-4'>
              <label className='base-semibold' htmlFor='lastname'>
                Last Name
              </label>
              <Input
                id='lastname'
                className=' w-full border-shadow-border bg-transparent'
              />
            </div>
          </div>
          <Button className='mt-auto self-end justify-self-end'>Next</Button>
        </div>
      </div>
    </section>
  );
}
