'use client';
import {
  DiscordWhite,
  LightBulb,
  Medal,
  Security,
} from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { fadeIn, staggerContainer, textVariant } from '@/constant/motion';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Spacer from '../root/Spacer';
const Guidence = () => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className='relative flex w-full justify-center bg-shadow-400 py-20'
    >
      <div className='flex-center w-full max-w-[1450px] flex-col'>
        <motion.h1 variants={textVariant(1.1)} className='h2-bold'>
          Expert College Guidance with Privacy Assurance
        </motion.h1>
        <Spacer y='40' />
        <motion.div
          variants={textVariant(1.2)}
          className='flex-between h-80 w-full gap-x-4'
        >
          <div
            className='flex h-full w-2/3 flex-col justify-evenly rounded-2xl px-8'
            style={{
              backgroundImage:
                'linear-gradient(86deg, #7059FF -6.35%, #BC65FF 70.22%, #D764FF 110.36%)',
              boxShadow: '4px 4px 16px 0px rgba(0, 0, 0, 0.05)',
            }}
          >
            <span className='flex-center self-start rounded-2xl bg-white p-1'>
              <Medal />
            </span>
            <h1 className='h3-bold text-white'>10+ Years of Experience</h1>
            <p className='small-regular text-white'>
              Our team consists of experts from Harvard Graduate School of
              Education, who have bring decades of experience helping more than
              10k students getting into top schools like Harvard, UPenn, UCLA,
              CMU and many more!
            </p>
          </div>
          <div className='flex h-full w-1/3 flex-col items-center justify-evenly rounded-2xl bg-[#3485FD] px-8'>
            <span className='flex w-2/3 flex-col rounded-2xl'>
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
        </motion.div>
        <Spacer y='24' />
        <div className='flex-between w-full gap-x-4'>
          <motion.div
            variants={fadeIn('right', 'tween', 1.3, 1)}
            className='flex w-1/2 flex-col gap-y-4 rounded-xl bg-white p-8'
          >
            <span className='self-start rounded-2xl bg-shadow-400 p-2'>
              <LightBulb />
            </span>
            <h2 className='h3-semibold'>
              Insights From Harvard & Stanford Alumni
            </h2>
            <p className='small-regular'>
              Benefit from the insights of our Harvard and Stanford alums who
              have successfully navigated the college application process.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn('left', 'tween', 1.3, 1)}
            className='flex w-1/2 flex-col gap-y-4 rounded-xl bg-white p-8'
          >
            <span className='self-start rounded-2xl bg-shadow-400 p-2'>
              <Security />
            </span>
            <h2 className='h3-semibold'>Your Privacy is Our Priority </h2>
            <p className='small-regular'>
              We prioritize your privacy, safeguarding your data with
              entreprise-level encryption and the robust security of Microsoft
              Azure.
            </p>
          </motion.div>
        </div>
        <Spacer y='40' />
        <Link passHref href={'/writtingpal/polish'}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </motion.section>
  );
};
export default Guidence;
