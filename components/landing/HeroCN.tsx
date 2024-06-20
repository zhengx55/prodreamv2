import { HomePageDicType } from '@/types';
import CaptureProvider from './CaptureProvider';
import { useTranslations } from 'next-intl';
import { HeroClientSectionCN } from './LandingCarouselCN';

const HeroCN = ({
}: HomePageDicType & { search_param: string }) => {
  const t = useTranslations('Homepage');

  return (
    <section className='relative flex w-full justify-center px-4 sm:mt-0 sm:px-0'>
      <CaptureProvider event='ScreenI'>
        <div className='sm:flex-center flex h-full w-full flex-col py-10 sm:w-[1200px] sm:py-20'>
          <HeroClientSectionCN />
        </div>
      </CaptureProvider>
    </section>
  );
};

export default HeroCN;
