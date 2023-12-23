'use client';

import { Storys, Universitys } from '@/constant';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const Story = () => {
  return (
    <section className='relative flex w-full justify-center bg-shadow-400 py-20'>
      <div className='flex-center w-full flex-col gap-y-3'>
        <h1 className='h2-bold w-2/3 text-center'>Our success story</h1>
        <p className='small-regualr w-1/3 text-center'>
          In the 2022-2023 admissions cycle, we partnered with ProDream
          Education and helped all their clients enter top 50 universities. Hear
          from our students!
        </p>
        <Spacer y='14' />
        <div className='inline-grid w-2/3 max-w-[1450px] grid-cols-4 gap-2'>
          {Universitys.map((item) => (
            <div className='flex-center' key={item.id}>
              <Image
                alt={item.alt}
                src={item.image}
                width={1920}
                height={920}
                className='h-16 w-auto'
              />
            </div>
          ))}
        </div>
        <Spacer y='48' />
        <Swiper
          loop={true}
          className='w-full'
          modules={[FreeMode]}
          freeMode={true}
          autoplay
          slidesPerView={3}
          spaceBetween={30}
        >
          {Storys.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                alt={item.alt}
                src={item.image}
                width={1920}
                height={920}
                className='h-auto w-auto'
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Spacer y='48' />
        <div className='relative flex w-full max-w-[1450px] flex-col justify-between gap-y-4 overflow-hidden rounded-[32px] bg-primary-200 py-12'>
          <Image alt='background' src='/landing/showcase/background.png' fill />
          <h2 className='h2-bold text-center text-white'>
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
