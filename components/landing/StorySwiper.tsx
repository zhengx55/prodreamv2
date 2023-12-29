import { Storys } from '@/constant';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const StorySwiper = () => {
  return (
    <div className='hidden w-full sm:flex '>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        autoplay
        slidesPerView={3}
        spaceBetween={20}
      >
        {Storys.map((item) => (
          <SwiperSlide className='h-full' key={item.id}>
            <Image
              alt={item.alt}
              src={item.image}
              width={500}
              height={300}
              className='h-full w-auto'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default StorySwiper;
