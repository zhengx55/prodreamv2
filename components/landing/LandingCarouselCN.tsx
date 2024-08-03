'use client';
import { HeroInfo, HeroMainInfo, Universitys } from '@/constant';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import Spacer from '../root/Spacer';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const UniversityCarouselCN = () => {
  const t = useTranslations('Homepage');

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
              className='object-contain grayscale'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const HeroShowCaseCarouselCN = () => {
  const t = useTranslations('Homepage');

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

const HeroCarouselCN = ({
  clickCallback,
}: {
  clickCallback: (index: number) => void;
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const t = useTranslations('Homepage');

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
                {t(`HeroInfo_title_${index + 1}`)}
              </h2>
              <p className='subtle-regular text-neutral-400-100'>
                {t(`HeroInfo_text_${index + 1}`)}
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

const HeroClientSectionCN = () => {
  const [selected, setSelected] = useState<number>(0);
  const t = useTranslations('Homepage');
  const memoSetSelected = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const handleMouseEnter = (index: number) => {
    setSelected(index);
  };
  return (
    <>
      <HeroCarouselCN clickCallback={memoSetSelected} />
      <div className='hidden w-full justify-between gap-x-4 sm:flex'>
        {HeroInfo.map((item, index) => {
          return (
            <span
              className={`${selected === index ? 'border-violet-500/20 ' : 'bg-violet-500/5'} flex cursor-pointer flex-col gap-y-2 rounded-[20px] border border-transparent p-5 sm:w-1/4`}
              key={item.id}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <Image
                alt={item.title}
                width={28}
                height={28}
                src={item.icon}
                priority={index === 0 ? true : false}
              />
              <h2 className='title-regular 2xl:h3-regular'>
                {t(`HeroInfo_title_${index + 1}`)}
              </h2>
              <p className='text-neutral-400-100 text-[18px] leading-relaxed'>
                {t(`HeroInfo_text_${index + 1}`)}
              </p>
            </span>
          );
        })}
      </div>
      <Spacer y='40' />
      <div className='relative h-[270px] w-full overflow-hidden sm:h-[800px]'>
        <Image
          alt={'prodream.ai'}
          src={HeroMainInfo[selected].image}
          fill
          priority
          sizes='(max-width: 768px) 50vw, 100vw'
          className='h-full w-full object-cover'
        />
      </div>
    </>
  );
};

HeroClientSectionCN.displayName = 'HeroClientSectionCN';
HeroCarouselCN.displayName = 'HeroCarouselCN';
UniversityCarouselCN.displayName = 'UniversityCarouselCN';
HeroShowCaseCarouselCN.displayName = 'HeroShowCaseCarouselCN';
export {
  HeroCarouselCN,
  HeroClientSectionCN,
  HeroShowCaseCarouselCN,
  UniversityCarouselCN,
};
