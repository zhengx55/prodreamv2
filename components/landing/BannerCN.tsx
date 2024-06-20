import { memo } from 'react';
import Spacer from '../root/Spacer';
import { useTranslations } from 'next-intl';
import CaptureProvider from './CaptureProvider';
import { UniversityCarousel } from './LandingCarousel';

const BannerCN = () => {
  const t = useTranslations('Homepage');

  return (
    <section className='relative flex w-full flex-col items-center justify-center sm:px-0 sm:py-20'>
      <Spacer y='20' />
      <CaptureProvider event='ScreenII'>
        <p className='text-center font-custom text-[48px] leading-relaxed'>{t('BannerInfo_sub_title')}</p>
      </CaptureProvider>

      <Spacer y='20' />
      <div className='flex-center w-full '>
        <UniversityCarousel />
      </div>
      <Spacer y='20' />
    </section>
  );
};
export default memo(BannerCN);
