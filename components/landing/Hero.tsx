import Image from 'next/image';
import Icon from '../root/Icon';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import UniversityCarousel from './University';

const Hero = () => {
  return (
    <section
      className='relative flex h-screen flex-1 flex-col items-center'
      style={{
        background:
          'linear-gradient(270deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, #D7E2F9 100.57%)',
      }}
      datatype='hero'
      aria-label='hero'
    >
      <Spacer y='120' />
      <div
        className='absolute inset-0 z-10 opacity-50'
        style={{
          background:
            'radial-gradient(circle at 2px 2px, #fff 2px, transparent 0)',
          backgroundSize: '10px 10px',
        }}
      />
      <div className='z-20 flex w-[85%] flex-1 pb-36 2xl:w-[70%]'>
        <div className='space-y-6 self-center'>
          <h1 className='font-bebas text-[68px] leading-[80px] tracking-wide'>
            Where <span className='text-indigo-500'>Professional AI</span>
            <br /> <span className='text-indigo-500'>Experts</span> Assist Your
            College
            <br /> Success Journey
          </h1>
          <p className='font-poppin text-xl leading-[30px] tracking-tight text-black/50'>
            We have accumulated offline resources from top tier
            <br /> universities and renowned teachers to help students achieve
            <br />
            their dreams of further education
          </p>
          <Button variant={'landing'} size={'expand'}>
            Contact us
          </Button>
        </div>
        <div className='relative flex flex-1'>
          <Image
            alt='hero'
            sizes='(max-width: 768px) 100vw, 33vw'
            src='/landing/hero/hero.png'
            fill
            className='object-contain'
          />
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 z-50 space-y-5'>
        <div className='flex-center gap-x-1'>
          <Icon
            alt='left'
            src='/landing/hero/left.svg'
            priority
            width={20}
            height={20}
            className='h-auto w-7'
          />
          <p className='font-poppin text-sm font-semibold'>
            Trusted by professionals in leading colleges
          </p>
          <Icon
            alt='left'
            src='/landing/hero/left.svg'
            priority
            width={20}
            height={20}
            className='h-auto w-7 scale-x-[-1]'
          />
        </div>
        <UniversityCarousel />
      </div>
    </section>
  );
};

export default Hero;
