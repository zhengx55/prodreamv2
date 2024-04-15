'use client';
import { HeroInfo, HeroMainInfo, Universitys } from '@/constant';
import { HomePageDicType } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import React from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const UniversityCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full'
    >
      <CarouselContent className='gap-x-4'>
        {Universitys.map((university) => (
          <CarouselItem
            className='relative h-28 basis-[30%] overflow-hidden sm:h-20 sm:w-64 sm:basis-[15%] '
            key={university.id}
          >
            <Image
              src={university.image}
              sizes='(max-width: 768px) 50vw, 100vw'
              alt={university.title}
              fill
              priority={false}
              className='object-contain grayscale'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const HeroShowCaseCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full max-w-xs'
    >
      <CarouselContent className='m-0'>
        {HeroMainInfo.map((info, idx) => (
          <CarouselItem
            className='relative h-[270px] basis-[100%] overflow-hidden sm:h-[740px]'
            key={info.id}
          >
            <Image
              alt={'prodream.ai'}
              src={info.image}
              key={info.id}
              fill
              priority={idx === 0 ? true : false}
              sizes='(max-width: 768px) 50vw, 100vw'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const HeroCarousel = ({
  clickCallback,
  t,
}: {
  clickCallback: (index: number) => void;
  t: HomePageDicType['t'];
}) => {
  const [api, setApi] = React.useState<CarouselApi>();

  api?.on('select', (value) => {
    clickCallback(value.selectedScrollSnap());
  });

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start',
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
      setApi={setApi}
      className='block sm:hidden'
    >
      <CarouselContent className='ml-10 mr-10 overflow-visible'>
        {HeroInfo.map((item, index) => {
          return (
            <CarouselItem
              className='ml-1 mr-1 flex flex-col gap-y-2 rounded-2xl bg-[#F8F9FC] p-5'
              key={item.id}
              onClick={() => {
                clickCallback(index);
                api?.scrollTo(index);
              }}
            >
              <Image
                alt={item.title}
                width={28}
                height={28}
                src={item.icon}
                priority={index === 0 ? true : false}
              />
              <h2 className='small-regular'>
                {t[`HeroInfo_title_${index + 1}` as keyof typeof t]}
              </h2>
              <p className='subtle-regular text-shadow-100'>
                {t[`HeroInfo_text_${index + 1}` as keyof typeof t]}
              </p>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

HeroCarousel.displayName = 'HeroCarousel';
UniversityCarousel.displayName = 'UniversityCarousel';
HeroShowCaseCarousel.displayName = 'HeroShowCaseCarousel';
export { HeroCarousel, HeroShowCaseCarousel, UniversityCarousel };
