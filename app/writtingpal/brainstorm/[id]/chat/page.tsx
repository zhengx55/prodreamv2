import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='mt-20 flex flex-1 flex-col items-center gap-y-[105px]'>
      <h1 className='h1-semibold capitalize'>How would you like to start?</h1>
      <div className='relative flex items-center md:gap-x-20'>
        <div className='chat-mode'>
          <div className='relative md:h-[180px] md:w-[200px]'>
            <Image
              alt='collaboration-mode'
              src='/comode.png'
              className='w-auto object-contain'
              fill
              priority
            />
          </div>

          <h1 className='h2-bold self-start'>Collaboration Mode</h1>
          <p className='title-light'>
            Start by brainstorming past experiences and write step by step!
          </p>
        </div>
        <div className='chat-mode'>
          <div className='relative md:h-[180px] md:w-[200px]'>
            <Image
              alt='collaboration-mode'
              src='/refmode.png'
              className='w-auto object-contain'
              fill
              priority
            />
          </div>

          <h1 className='h2-bold self-start'>Reference Mode</h1>
          <p className='title-light'>
            I already have a plan! Start by filling out information on my
            experiences and get sample essays!
          </p>
        </div>
        <Button size={'expand'} className='absolute -bottom-20 right-0'>
          Next
        </Button>
      </div>
    </main>
  );
}
