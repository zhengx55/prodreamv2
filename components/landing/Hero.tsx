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
          src='/landing/heros/Mask_group.png'
        />
      </m.div>

      <m.div
        variants={textVariant(0)}
        className='sm:flex-center sm:gap-y-100 flex h-full w-full flex-col gap-y-4 sm:max-w-[1200px] sm:flex-col'
      >
        <section className='flex w-full flex-col sm:w-[1200px] sm:pt-[60px]'>
          <h1 className='text-center font-baskerville text-[32px] font-[400] leading-normal sm:text-center sm:text-[48px]'>
            <span className='relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
              Transform
            </span>{' '}
            Your
            <br className='sm:hidden' /> Academic
            <br className='hidden sm:block' /> Writing
            <br className='sm:hidden' /> journey
          </h1>
          <Spacer y='20' />
          <p className='small-regular text-center text-[14px] text-[#64626A] sm:text-center sm:text-[18px]'>
            Experience the future of academic writing with ProDream - the
            one-stop <br /> solution that enhances writing efficiency and
            elevates paper quality
          </p>
          <Spacer y='40' />
          <div className='relative flex w-full flex-col items-center justify-center gap-x-0 gap-y-4 pl-2 sm:flex-row sm:items-start sm:gap-x-6 sm:gap-y-0'>
            <Link passHref href={'/signup'}>
              <Button
                role='button'
                className='h-max w-2/3 rounded-lg bg-[#8551F3] sm:w-max sm:px-8 sm:py-2.5'
              >
                <strong>Start Writing!</strong>It&apos;s Free
              </Button>
            </Link>

            <Link
              href={'https://discord.gg/xXSFXv5kPd'}
              passHref
              target='_blank'
            >
              <Button
                className='h-max w-2/3 rounded-lg border border-[#8551F3] text-[#8551F3] sm:w-max sm:px-8 sm:py-2.5'
                variant={'ghost'}
                role='button'
              >
                Join Community
              </Button>
            </Link>
          </div>
        </section>

        <section className='relative top-[50px] flex h-[196px] w-full flex-col overflow-hidden rounded-xl sm:top-10 sm:h-[610px] sm:w-[1070px]'>
          <Image
            draggable='false'
            alt='hero-showcase'
            priority
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 100vw'
            src='/landing/heros/Banner.png'
          />
        </section>
      </m.div>
    </m.section>
  );
};
export default Hero;
