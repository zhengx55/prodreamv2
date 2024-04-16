import { HomePageDicType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import CaptureProvider from './CaptureProvider';
import { HeroClientSection } from './LandingCarousel';
import TypeTitle from './TypeTitle';

const Hero = ({
  t,
  lang,
  search_param,
}: HomePageDicType & { search_param: string }) => {
  return (
    <section className='relative flex w-full justify-center px-4 sm:mt-0 sm:px-0'>
      <div className='absolute -z-10 hidden h-full w-full sm:block'>
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
      </div>
      <CaptureProvider event='ScreenI'>
        <div className='sm:flex-center flex h-full w-full flex-col py-10 sm:w-[1200px] sm:flex-col sm:py-20'>
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
                search_param
                  ? `/${lang}/signup?from=${search_param}`
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
                variant={'outline'}
                role='button'
              >
                {t.join_community}
              </Button>
            </Link>
          </div>
          <Spacer y='90' className='hidden sm:block' />
          <Spacer y='20' className='block sm:hidden' />
          <HeroClientSection t={t} />
        </div>
      </CaptureProvider>
    </section>
  );
};

export default Hero;
