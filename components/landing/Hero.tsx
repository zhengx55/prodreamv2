'use client';
import { fadeIn, staggerContainer, textVariant } from '@/constant/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
      className='relative flex min-h-[calc(100vh_-64px)] w-full justify-center'
    >
      <motion.div
        variants={fadeIn('left', 'tween', 0, 0.5)}
        className='absolute h-full w-full'
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
        className='flex-center h-full w-full max-w-[1450px]'
      >
        <section className='flex w-1/2 flex-col'>
          <h1 className='text-[50px] font-[700] leading-[130%] tracking-tighter'>
            Elevate your personal
            <br /> statement with{' '}
            <span className='text-primary-200'>
              admission-
              <br />
              grade
            </span>{' '}
            feedbacks
          </h1>
          <Spacer y='20' />
          <p className='small-regular'>Backed by 400+ admission counselors.</p>
          <Spacer y='40' />
          <div className='relative flex gap-x-2 pl-2'>
            <Image
              draggable='false'
              alt='Signup'
              src='/landing/heros/Signup.png'
              width={28}
              height={28}
              className='absolute -left-4 -top-4 h-7 w-7'
            />
            <Button className='h-max rounded-[40px] px-8 py-3.5'>
              <strong>Sign Up Now!</strong>It&apos;s Free
            </Button>
            <Button
              className='h-max rounded-[40px] border border-black-400 px-8 py-3.5'
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
        <section className='relative flex w-1/2 flex-col'>
          <div className='z-10 flex h-14 w-[450px] items-center gap-x-2.5 self-center rounded-lg border border-shadow-border bg-white p-1'>
            <span
              onClick={() => setSelected(0)}
              className={`${
                selected === 0
                  ? 'bg-primary-50 text-primary-200'
                  : 'bg-transparent'
              } flex-center base-medium h-full w-1/2 cursor-pointer gap-x-2 rounded-lg`}
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
              } flex-center base-medium h-full w-1/2 cursor-pointer gap-x-2 rounded-lg`}
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
              className='z-10 h-auto w-[800px]'
              width={1920}
              height={950}
              priority
            />
          ) : (
            <Image
              alt='herodemo-2'
              src='/landing/heros/hero-2.gif'
              className='h-auto w-[800px]'
              width={1920}
              height={950}
              priority
            />
          )}
        </section>
      </motion.div>
    </motion.section>
  );
};
export default Hero;
