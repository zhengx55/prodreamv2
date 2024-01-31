'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const StorySwiper = dynamic(() => import('./StorySwiper'));

const Story = () => {
  return (
    <section className='relative flex w-full justify-center bg-shadow-400 sm:mt-[160px] sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-3'>
        <div className='relative flex w-full flex-col justify-between gap-y-4 overflow-hidden bg-doc-primary py-[22px] sm:w-full sm:py-12'>
          <Image
            alt='background'
            src='/landing/showcase/background.png'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          />
          <h2 className='sm:h2-bold text-center text-[22px] font-[600] text-white'>
            You&apos;ve come this far.
            <br /> Let&apos;s make your essay unforgettable!
          </h2>
          <Spacer y='14' />
          <Link href={'/signup'} passHref className='z-[100] self-center'>
            <Button
              className='self-center rounded-xl border border-white bg-transparent text-white'
              variant={'ghost'}
            >
              Start Writing Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Story;
