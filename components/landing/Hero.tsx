'use client';
import { HeroInfo, HeroMainInfo } from '@/constant';
import { staggerContainer, textVariant } from '@/constant/motion';
import useInviewCapture from '@/hooks/useInViewCapture';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import useLocalization from '@/hooks/useLocalization';

const HeroCarousel = dynamic(
  () => import('./LandingCarousel').then((mod) => mod.HeroCarousel),
  {
    ssr: false,
  }
);

const Hero = () => {
  const [selected, setSelected] = useState(0);
  const { ref } = useInviewCapture('ScreenI');
  const memoSetSelected = useCallback((index: number) => {
    setSelected(index);
  }, []);
  

  const { t } = useLocalization();

  return (
    <m.section
      ref={ref}
      variants={staggerContainer()}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className='relative flex justify-center w-full px-4 sm:mt-0 sm:px-0'
    >
      <m.div
        variants={textVariant(0.3)}
        className='absolute hidden w-full h-full -z-10 sm:block'
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
        <h1 className='text-center font-baskerville text-[32px] font-[400] leading-normal sm:text-center sm:text-[48px]'>
          <span className='font-custom relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
          {t("transform")} 
          </span>{' '}
          {t('your')}
          <br className='sm:hidden' /> {t('academic')}
          <br className='hidden sm:block' /> {t('writing')}
          <br className='sm:hidden' /> {t('journey')}
        </h1>
        <Spacer y='20' />
        <p className='text-center text-[14px] leading-relaxed tracking-normal text-[#64626A] sm:text-center sm:text-[18px]'>
          {t('experience_the')}{' '}
          <span className='text-doc-primary'>{t('one_stop')}</span>
          <br className='hidden sm:block' /> {t('that_enhances_writing')}&nbsp;
          <span className='text-doc-primary'>{t('efficiency')}</span> {t('and_elevates')}
          {t('paper')} <span className='text-doc-primary'>{t('quality')}</span>
        </p>
        <Spacer y='40' />
        <div className='relative flex flex-col items-center justify-center w-full pl-2 gap-x-0 gap-y-4 sm:flex-row sm:items-start sm:gap-x-6 sm:gap-y-0'>
          <Link passHref href={'/signup'}>
            <Button
              role='button'
              className='h-max w-52 rounded-lg bg-doc-primary px-5 sm:w-max sm:px-8 sm:py-2.5'
            >
              <strong>Start Writing!</strong>It&apos;s Free
            </Button>
          </Link>
          <Link href={'https://discord.gg/xXSFXv5kPd'} passHref target='_blank'>
            <Button
              className='h-max w-52 rounded-lg border border-doc-primary text-doc-primary sm:w-max sm:px-8 sm:py-2.5'
              variant={'ghost'}
              role='button'
            >
              Join Community
            </Button>
          </Link>
        </div>
        <Spacer y='90' className='hidden sm:block' />
        <Spacer y='20' className='block sm:hidden' />
        <HeroCarousel clickCallback={memoSetSelected} />
        <div className='justify-between hidden w-full gap-x-4 sm:flex'>
          {HeroInfo.map((item, index) => {
            return (
              <span
                className={`${selected === index ? 'border border-doc-primary/20 ' : 'bg-doc-primary/5'} flex cursor-pointer flex-col gap-y-2 rounded-[20px] p-5 sm:w-1/4`}
                key={item.id}
                onClick={() => setSelected(index)}
              >
                <Image
                  alt={item.title}
                  width={28}
                  height={28}
                  src={item.icon}
                  loading='eager'
                  priority
                />
                <h2 className='title-regular 2xl:h3-regular'>{t(`HeroInfo_title_${index+1}`)}</h2>
                <p className='text-[12px] leading-relaxed text-shadow-100 2xl:text-regular'>
                  {t(`HeroInfo_text_${index+1}`)}
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
            loading='eager'
            priority
            sizes='(max-width: 768px) 50vw, 100vw'
          />
        </div>
      </m.div>
    </m.section>
  );
};
export default Hero;
