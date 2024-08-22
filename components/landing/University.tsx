'use client';
import { Universitys } from '@/constant/landing';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

const UniversityCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[AutoScroll()]}
      className='z-50 w-full bg-white'
    >
      <CarouselContent>
        {Universitys.map((university) => (
          <CarouselItem
            className='relative h-24 basis-[30%] overflow-hidden sm:h-24 sm:basis-[15%]'
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

export default UniversityCarousel;
