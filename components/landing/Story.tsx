'use client';
import { Storys, Universitys } from '@/constant';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const StorySwiper = dynamic(() => import('./StorySwiper'));

const Story = () => {
  return (
    <section className='relative flex w-full justify-center bg-shadow-400 px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-3'>
        <h1 className='h2-bold w-full text-center sm:w-2/3'>
          Our success story
        </h1>
        <p className='small-regualr w-full text-center sm:w-1/3'>
          In the 2022-2023 admissions cycle, we partnered with ProDream
          Education and helped all their clients enter top 50 universities. Hear
          from our students!
        </p>
        <Spacer y='14' />
        <div className='inline-grid w-full grid-cols-4 gap-2 sm:w-2/3 sm:max-w-[1450px]'>
          {Universitys.map((item) => (
            <div className='flex-center' key={item.id}>
              <Image
                alt={item.alt}
                src={item.image}
                width={1920}
                height={920}
                className='h-8 w-auto sm:h-16'
              />
            </div>
          ))}
        </div>
        <Spacer y='48' />
        <StorySwiper />
        <div className='flex w-full sm:hidden '>
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            autoplay
            slidesPerView={1}
          >
            {Storys.map((item) => (
              <SwiperSlide className='h-full' key={item.id}>
                <Image
                  alt={item.alt}
                  src={item.image}
                  width={500}
                  height={300}
                  className='h-auto w-full'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Spacer y='48' />
        <div className='relative flex w-full flex-col justify-between gap-y-4 overflow-hidden rounded-[32px] bg-primary-200 py-6 sm:max-w-[1450px] sm:py-12'>
          <Image
            alt='background'
            src='/landing/showcase/background.png'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          />
          <h2 className='h3-bold sm:h2-bold text-center text-white'>
            You&apos;ve come this far.
            <br /> Let&apos;s make your essay unforgettable!
          </h2>
          <Spacer y='14' />
          <Button
            className='self-center rounded-2xl border border-white bg-transparent text-white'
            variant={'ghost'}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Story;
