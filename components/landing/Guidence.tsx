'use client';
import {
  DiscordWhite,
  LightBulb,
  Medal,
  Security,
} from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { fadeIn, staggerContainer, textVariant } from '@/constant/motion';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Spacer from '../root/Spacer';
const Guidence = () => {
  return (
    <m.section
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className='relative flex w-full justify-center bg-shadow-400 px-4 py-20 md:px-0'
    >
      <div className='flex-center w-full flex-col sm:max-w-[1450px]'>
        <m.h1
          variants={textVariant(1.1)}
          className='h3-semibold sm:h2-bold text-center sm:text-left'
        >
          Expert College Guidance with Privacy Assurance
        </m.h1>
        <Spacer y='40' />
        <m.div
          variants={textVariant(1.2)}
          className='flex-between w-full flex-col gap-x-4 sm:h-80 sm:flex-row'
        >
          <div
            className='flex h-full w-full flex-col gap-y-4 rounded-[40px] px-4 py-12 sm:w-2/3 sm:justify-evenly sm:gap-y-0 sm:rounded-2xl sm:px-8 sm:py-0'
            style={{
              backgroundImage:
                'linear-gradient(86deg, #7059FF -6.35%, #BC65FF 70.22%, #D764FF 110.36%)',
              boxShadow: '4px 4px 16px 0px rgba(0, 0, 0, 0.05)',
            }}
          >
            <span className='flex-center self-start rounded-2xl bg-white p-1'>
              <Medal />
            </span>
            <h1 className='h3-semibold sm:h3-bold text-white'>
              10+ Years of Experience
            </h1>
            <p className='title-regular sm:small-regular text-white'>
              Our team consists of experts from Harvard Graduate School of
              Education, who have bring decades of experience helping more than
              10k students getting into top schools like Harvard, UPenn, UCLA,
              CMU and many more!
            </p>
          </div>
          <Spacer y='24' className='block sm:hidden' />
          <div className='flex w-full flex-col items-center justify-evenly gap-y-4 rounded-2xl bg-[#3485FD] px-8 py-4 sm:h-full sm:w-1/3 sm:gap-y-0 sm:py-0'>
            <span className='flex w-full flex-col rounded-2xl sm:w-2/3'>
              <div className='sel flex items-center justify-between rounded-t-2xl bg-black-400 px-2 py-1.5'>
                <div className='flex items-center gap-x-2'>
                  <div className='flex flex-col'>
                    <p className='base-semibold text-white'>ProDream</p>
                    <p className='small-regular text-white'>#Essay_feedback</p>
                  </div>
                </div>
                <DiscordWhite />
              </div>
              <div className='flex flex-col rounded-b-2xl bg-gray-50 px-4 pt-3'>
                <p className='text-white'>#👋 Hey there</p>
                <p className='small-regular text-nav-selected'>
                  Join ProDream community to receive exclusive admission tips!
                </p>
                <span className='base-regualr inline-flex items-center gap-x-1 self-center py-4 text-white'>
                  Join <ArrowUpRight size={18} />
                </span>
              </div>
            </span>
            <Link
              passHref
              href={'https://discord.com/invite/h37uz8HYSH'}
              target='_blank'
            >
              <Button
                variant={'white'}
                className='small-semibold justify-center rounded-3xl'
              >
                Join our discord community!
              </Button>
            </Link>
          </div>
        </m.div>
        <Spacer y='24' />
        <div className='flex-between w-full flex-col gap-y-4 sm:gap-x-4 sm:gap-y-0 md:flex-row'>
          <m.div
            variants={fadeIn('right', 'tween', 1.3, 1)}
            className='flex w-full flex-col gap-y-4 rounded-xl bg-white p-5 sm:w-1/2 sm:p-8'
          >
            <span className='self-start rounded-2xl bg-shadow-400 p-2'>
              <LightBulb />
            </span>
            <h2 className='title-semibold sm:h3-semibold'>
              Insights From Harvard & Stanford Alumni
            </h2>
            <p className='small-regular'>
              Benefit from the insights of our Harvard and Stanford alums who
              have successfully navigated the college application process.
            </p>
          </m.div>
          <m.div
            variants={fadeIn('left', 'tween', 1.3, 1)}
            className='flex w-full flex-col gap-y-4 rounded-xl bg-white p-5 sm:w-1/2 sm:p-8'
          >
            <span className='self-start rounded-2xl bg-shadow-400 p-2'>
              <Security />
            </span>
            <h2 className='title-semibold sm:h3-semibold'>
              Your Privacy is Our Priority
            </h2>
            <p className='small-regular'>
              We prioritize your privacy, safeguarding your data with
              entreprise-level encryption and the robust security of Microsoft
              Azure.
            </p>
          </m.div>
        </div>
        <Spacer y='40' />
        <Button className='rounded-[40px] sm:rounded-2xl' asChild>
          <Link href={'/writtingpal/polish'}>Get Started</Link>
        </Button>
      </div>
    </m.section>
  );
};
export default Guidence;
