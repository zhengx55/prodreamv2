'use client';
import { fadeIn, staggerContainer, textVariant } from '@/constant/motion';
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const Hero = () => {
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
          className='absolute top-10 h-[90%] w-full'
          width={1400}
          height={900}
          sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          src='/landing/heros/Mask_group.png'
        />
      </m.div>

      <m.div
        variants={textVariant(0)}
        className='sm:flex-center sm:gap-y-100 flex h-full w-full flex-col gap-y-4 sm:max-w-[1200px] sm:flex-col'
      >
        <section className='flex w-full flex-col sm:w-[1200px] sm:pt-[60px]'>
          <h1 className='text-center font-baskerville text-[32px] font-[400] leading-[32px] tracking-tighter sm:text-center sm:text-[48px] sm:leading-[58px]'>
            <span className='relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
              Transform{' '}
            </span>{' '}
            Your
            <br className='sm:hidden' /> Academic
            <br className='hidden sm:block' /> Writing
            <br className='sm:hidden' /> Journey
          </h1>
          <Spacer y='20' />
          <p className='small-regular text-center text-[14px] text-[#64626A] sm:text-center sm:text-[18px]'>
            Craft Superior Essays and Research Papers with Cutting-Edge AI
            Assistance
          </p>
          <Spacer y='40' />
          <div className='relative flex w-full flex-col items-center justify-center gap-x-0 gap-y-4 pl-2 sm:flex-row sm:items-start sm:gap-x-2 sm:gap-y-0'>
            <Button
              asChild
              className='h-max w-2/3 rounded-[8px] bg-[#8551F3] hover:bg-[#8551F3] sm:w-max sm:px-8 sm:py-3.5'
            >
              <Link href={'/signup'}>
                <strong>Start Writing!</strong>It&apos;s Free
              </Link>
            </Button>
            <Button
              className='h-max w-2/3 rounded-[8px] border border-[#8551F3] text-[#8551F3] sm:w-max sm:px-8 sm:py-3.5'
              variant={'ghost'}
            >
              <Link
                href={'https://discord.com/invite/h37uz8HYSH'}
                passHref
                target='_blank'
              >
                Join Community
              </Link>
            </Button>
          </div>
        </section>
        <section className='relative top-[50px] flex h-[196px] w-full flex-col overflow-hidden rounded-[8px] border-[2px] border-[#000] sm:top-10 sm:h-[610px] sm:w-[1070px] sm:rounded-[24px] sm:border-[12px]'>
          <Image
            draggable='false'
            alt='hero-showcase'
            priority
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
            src='/landing/heros/hero-1.gif'
          />
        </section>
      </m.div>
    </m.section>
  );
};
export default Hero;
