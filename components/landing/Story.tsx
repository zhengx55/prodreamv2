'use client';
import { Universitys } from '@/constant';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const StorySwiper = dynamic(() => import('./StorySwiper'));

const Story = () => {
  return (
    <section className='relative flex w-full justify-center bg-shadow-400 sm:px-0 sm:mt-[160px]'>
      <div className='flex-center w-full flex-col gap-y-3'>
        <div className='relative flex w-full flex-col justify-between py-[22px] gap-y-4 overflow-hidden bg-[#8551F3] sm:w-full sm:py-12'>
          <Image
            alt='background'
            src='/landing/showcase/background.png'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          />
          <h2 className='sm:h2-bold text-[22px] font-[600] text-center text-white'>
            You&apos;ve come this far.
            <br /> Let&apos;s make your essay unforgettable!
          </h2>
          <Spacer y='14' />
          <Button
            className='self-center rounded-[8px] border border-white bg-transparent text-white z-[100]'
            variant={'ghost'}
          >
            Start Writing Now
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Story;
