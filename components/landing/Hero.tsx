'use client';
import { fadeIn, staggerContainer, textVariant } from '@/constant/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const Hero = () => {
  const [selected, setSelected] = useState(0);
  return (
    <motion.section
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className='relative mt-4 flex w-full justify-center px-4 sm:mt-0 sm:min-h-[calc(100vh_-64px)] sm:px-0'
    >
      <motion.div
        variants={fadeIn('left', 'tween', 0, 0.5)}
        className='absolute hidden h-full w-full sm:block'
      >
        <Image
          draggable='false'
          alt='gardient-bg'
          priority
          className='absolute -right-[200px] top-10 h-full w-auto'
          width={1920}
          height={950}
          sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          src='/landing/heros/herobg.png'
        />
      </motion.div>

      <motion.div
        variants={textVariant(0)}
        className='sm:flex-center flex h-full w-full flex-col gap-y-4 sm:max-w-[1450px] sm:flex-row sm:gap-y-0'
      >
        <section className='flex w-full flex-col sm:w-1/2'>
          <h1 className='text-center text-[28px] font-[700] leading-[130%] tracking-tighter sm:text-left sm:text-[50px]'>
            Elevate your personal
            <br /> statement with{' '}
            <span className='text-primary-200'>
              admission-
              <br className='hidden sm:block' />
              grade
            </span>{' '}
            feedbacks
          </h1>
          <Spacer y='20' />
          <p className='small-regular text-center sm:text-left'>
            Backed by 400+ admission counselors.
          </p>
          <Spacer y='40' />
          <div className='relative flex w-full flex-col items-center gap-x-0 gap-y-4 pl-2 sm:flex-row sm:items-start sm:gap-x-2 sm:gap-y-0'>
            <Image
              draggable='false'
              alt='Signup'
              src='/landing/heros/Signup.png'
              width={28}
              height={28}
              className='absolute -top-2 left-8 h-7 w-7 sm:-left-4 sm:-top-4'
            />
            <Button
              asChild
              className='h-max w-2/3 rounded-[40px] sm:w-max sm:px-8 sm:py-3.5'
            >
              <Link href={'/signup'}>
                <strong>Sign Up Now!</strong>It&apos;s Free
              </Link>
            </Button>
            <Button
              className='h-max w-2/3 rounded-[40px] border border-black-400 sm:w-max sm:px-8 sm:py-3.5'
              variant={'ghost'}
            >
              <Image
                draggable='false'
                src='/google.svg'
                alt='google'
                width={23}
                height={23}
                priority
                className='h-auto w-auto'
              />
              Sign up with Google
            </Button>
          </div>
        </section>
        <section className='relative flex w-full flex-col sm:w-1/2'>
          <div className='z-10 flex h-10 w-full items-center gap-x-2.5 self-center rounded-lg border border-shadow-border bg-white p-1 sm:h-14 sm:w-[450px]'>
            <span
              onClick={() => setSelected(0)}
              className={`${
                selected === 0
                  ? 'bg-primary-50 text-primary-200'
                  : 'bg-transparent'
              } flex-center small-medium sm:base-medium h-full w-1/2 cursor-pointer gap-x-2 rounded-lg`}
            >
              <span
                className={`${
                  selected === 0 ? 'bg-white' : 'bg-nav-selected'
                } px-2 py-1`}
              >
                1
              </span>
              Get Your Report
            </span>
            <span
              onClick={() => setSelected(1)}
              className={`${
                selected === 1
                  ? 'bg-primary-50 text-primary-200'
                  : 'bg-transparent'
              } flex-center small-medium sm:base-medium h-full w-1/2 cursor-pointer gap-x-2 rounded-lg`}
            >
              <span
                className={`${
                  selected === 1 ? 'bg-white' : 'bg-nav-selected'
                } px-2 py-1`}
              >
                2
              </span>
              Refine Your Essay
            </span>
          </div>
          <Spacer y='24' />
          {selected === 0 ? (
            <Image
              alt='herodemo-1'
              src='/landing/heros/hero-1.gif'
              className='z-10 h-auto w-full'
              width={800}
              height={500}
              priority
            />
          ) : (
            <Image
              alt='herodemo-2'
              src='/landing/heros/hero-2.gif'
              className='h-auto w-full'
              width={800}
              height={500}
              priority
            />
          )}
        </section>
      </motion.div>
    </motion.section>
  );
};
export default Hero;
