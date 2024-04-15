'use client';
import { HeroInfo, HeroMainInfo } from '@/constant';
import { staggerContainer, textVariant } from '@/constant/motion';
import useInviewCapture from '@/hooks/useInViewCapture';
import { HomePageDicType } from '@/types';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import TypeTitle from './TypeTitle';

const HeroCarousel = dynamic(
  () => import('./LandingCarousel').then((mod) => mod.HeroCarousel),
  {
    ssr: false,
  }
);

const Hero = ({ t, lang }: HomePageDicType) => {
  const [selected, setSelected] = useState<number>(0);
  const [autoSwitchInterval, setAutoSwitchInterval] = useState<number | null>(
    null
  );
  const searchParams = useSearchParams().get('from');
  const { ref } = useInviewCapture('ScreenI');
  const memoSetSelected = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const handleMouseEnter = (index: number) => {
    setSelected(index);
    if (autoSwitchInterval) {
      clearInterval(autoSwitchInterval);
      setAutoSwitchInterval(null);
    }
  };

  return (
    <m.section
      ref={ref}
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className='relative flex w-full justify-center px-4 sm:mt-0 sm:px-0'
    >
      <m.div
        variants={textVariant(0.3)}
        className='absolute -z-10 hidden h-full w-full sm:block'
      >
        <Image
          draggable='false'
          alt='gardient-bg'
          priority
          className='absolute top-10 h-[80%] w-full'
          width={10}
          height={10}
          loading='eager'
          src='/landing/heros/Mask_group.png'
        />
      </m.div>
      <m.div
        variants={textVariant(0)}
        className='sm:flex-center flex h-full w-full flex-col py-10 sm:w-[1200px] sm:flex-col sm:py-20'
      >
        {lang === 'en' ? (
          <TypeTitle t={t} />
        ) : (
          <h1 className='text-center font-custom text-[32px] font-[400] leading-normal sm:text-center sm:text-[48px]'>
            {t.transform}
            <br /> {t.your}
            {t.academic}
            {t.writing}
            {t.journey}
          </h1>
        )}

        <Spacer y='40' />
        <div className='relative flex w-full flex-col items-center justify-center gap-x-0 gap-y-4 pl-2 sm:flex-row sm:items-start sm:gap-x-6 sm:gap-y-0'>
          <Link
            prefetch={false}
            passHref
            href={
              searchParams
                ? `/${lang}/signup?from=${searchParams}`
                : lang === 'cn'
                  ? `/${lang}/signup?from=cn`
                  : `/${lang}/signup`
            }
          >
            <Button
              role='button'
              className='h-max w-52 rounded-lg bg-violet-500 px-5 sm:w-max sm:px-8 sm:py-2.5'
            >
              <strong>{t.start_writing}</strong>
              {t.It_s_free}
            </Button>
          </Link>
          <Link
            prefetch={false}
            href={'https://discord.gg/xXSFXv5kPd'}
            passHref
            target='_blank'
          >
            <Button
              className='h-max w-52 rounded-lg border border-violet-500 text-violet-500 sm:w-max sm:px-8 sm:py-2.5'
              variant={'ghost'}
              role='button'
            >
              {t.join_community}
            </Button>
          </Link>
        </div>
        <Spacer y='90' className='hidden sm:block' />
        <Spacer y='20' className='block sm:hidden' />
        <HeroCarousel clickCallback={memoSetSelected} t={t} />
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
                  loading='eager'
                  priority
                />
                <h2 className='title-regular 2xl:h3-regular'>
                  {t[`HeroInfo_title_${index + 1}` as keyof typeof t]}
                </h2>
                <p className='text-[12px] leading-relaxed text-shadow-100 2xl:text-xs'>
                  {t[`HeroInfo_text_${index + 1}` as keyof typeof t]}
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
            loading='lazy'
            sizes='(max-width: 768px) 50vw, 100vw'
            className='h-full w-full object-cover'
          />
        </div>
      </m.div>
    </m.section>
  );
};

export default Hero;
