'use client';
import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const BottomBanner = () => {
  return (
    <section className='relative flex w-full justify-center bg-shadow-400 py-10 sm:py-20'>
      <div className='flex-center w-full flex-col gap-y-3 px-5 sm:w-[1200px] sm:px-0'>
        <div className='relative flex w-full flex-col gap-y-4 overflow-hidden rounded-3xl bg-doc-primary py-[22px] sm:rounded-[32px] sm:py-12'>
          <Image
            alt='background'
            src='/landing/showcase/background.png'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          />
          <h2 className='sm:h2-bold text-center text-[22px] font-[600] text-white'>
            You&apos;ve come this far.
            <br />
            <span className=' font-baskerville'>
              Let&apos;s make your essay unforgettable!
            </span>
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
export default BottomBanner;
