'use client';
import { fadeIn, staggerContainer, textVariant } from '@/constant/motion';
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const Hero = () => {
  const [selected, setSelected] = useState(0);
  return (
    <m.section
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className='relative mt-4 flex w-full justify-center px-4 sm:mt-0 sm:px-0'
    >
      <m.div
        variants={fadeIn('left', 'tween', 0, 0.5)}
        className='absolute h-full w-full sm:block'
      >
        <Image
          draggable='false'
          alt='gardient-bg'
          priority
          className='absolute top-10 w-full h-[90%] w-auto'
          width={1400}
          height={900}
          sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          src='/landing/heros/Mask_group.png'
        />
      </m.div>

      <m.div
        variants={textVariant(0)}
        className='sm:flex-center flex flex-col h-full w-full sm:flex-col gap-y-4 sm:max-w-[1450px] sm:flex-row sm:gap-y-100'
      >
        <section className='flex w-full flex-col sm:w-[1200px] sm:pt-[200px]'>
          <h1 className='font-baskerville text-center text-[32px] font-[400] tracking-tighter sm:text-center sm:text-[72px]'>
          <span className="before:block before:absolute before:top-[22px] sm:before:top-[56px] before:-inset-1 before:-skew-y-0 before:h-[30%] sm:before:h-[40%] before:bg-[#D2DFFF] relative inline-block before:z-[-1]">Transform </span> Your<br className='sm:hidden'/> Academic<br className='hidden sm:block'/> Writing<br className='sm:hidden'/> Journey
          </h1>
          <Spacer y='20' />
          <p className='small-regular text-[14px] text-[#64626A] text-center sm:text-[28px] sm:text-center'>
          Craft Superior Essays and Research Papers with Cutting-Edge AI Assistance
          </p>
          <Spacer y='40' />
          <div className='relative flex w-full flex-col items-center justify-center gap-x-0 gap-y-4 pl-2 sm:flex-row sm:items-start sm:gap-x-2 sm:gap-y-0'>
            <Button
              asChild
              className='h-max w-2/3 rounded-[8px] sm:w-max bg-[#8551F3] hover:bg-[#8551F3] sm:px-8 sm:py-3.5'
            >
              <Link href={'/signup'}>
                <strong>Start Writing!</strong>It&apos;s Free
              </Link>
            </Button>
            <Button
              className='h-max w-2/3 rounded-[8px] text-[#8551F3] border border-[#8551F3] sm:w-max sm:px-8 sm:py-3.5'
              variant={'ghost'}
            >
              Join Community
            </Button>
          </div>
        </section>
        <section className='relative flex w-full flex-col sm:rounded-[24px] rounded-[8px] sm:border-[12px] border-[2px] border-[#000] overflow-hidden sm:w-[1070px] sm:h-[610px] h-[196px] top-[50px] sm:top-10'>
          <Image
            draggable='false'
            alt='gardient-bg'
            priority
            className='absolute w-full h-full w-auto'
            width={1070}
            height={900}
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
            src='/landing/heros/hero-1.gif'
          />
        </section>
      </m.div>
    </m.section>
  );
};
export default Hero;
