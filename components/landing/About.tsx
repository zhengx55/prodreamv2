import { AboutInfo } from '@/constant';
import { HomePageDicType } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Spacer from '../root/Spacer';
import CaptureProvider from './CaptureProvider';

const About = ({ lang }: HomePageDicType) => {
  const tHomepage = useTranslations('Homepage');

  return (
    <section className='relative flex w-full justify-center px-4 py-10 sm:px-0 sm:py-20'>
      <div className='flex-center w-full flex-col sm:max-w-[1200px]'>
        {lang === 'en' ? (
          <h2 className='font-baskerville text-[24px] leading-relaxed sm:text-[48px]'>
            {tHomepage('AboutInfo_title')}
            <span className='relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
              {tHomepage('AboutInfo_Faster')}
            </span>
          </h2>
        ) : (
          <h2 className='font-custom text-[24px] leading-relaxed sm:text-[48px]'>
            {tHomepage('AboutInfo_title')} {tHomepage('AboutInfo_Faster')}
          </h2>
        )}

        <Spacer y='10' />
        <CaptureProvider event='ScreenIII'>
          <p className='subtle-regular sm:base-regular text-neutral-400-100 text-center'>
            {tHomepage('AboutInfo_CaptureProvider_1')}
            <br className='hidden sm:block' />{' '}
            {tHomepage('AboutInfo_CaptureProvider_2')}
          </p>
        </CaptureProvider>
        <Spacer y='40' />
        <div className='flex flex-col gap-y-9'>
          {AboutInfo.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`w-full ${index === 1 ? 'sm:flex-row-reverse' : ''}  flex h-[420px] flex-col items-center rounded-2xl bg-violet-500/5 sm:h-[370px] sm:flex-row`}
              >
                <div className='flex w-full flex-col gap-y-4 p-4 sm:w-1/2 sm:p-10'>
                  <h3 className='text-[20px] leading-snug sm:text-[30px]'>
                    {tHomepage(`AboutInfo_title_${index + 1}`)}
                  </h3>
                  <p className='text-neutral-400-100 text-[12px] leading-loose sm:text-xs'>
                    {tHomepage(`AboutInfo_description_${index + 1}`)}
                  </p>
                </div>
                <div className='h-full w-full sm:w-1/2 sm:p-10'>
                  <div className='relative h-full w-full overflow-hidden'>
                    <Image
                      alt={tHomepage(`AboutInfo_title_${index + 1}`)}
                      src={item.image}
                      fill
                      className='object-contain'
                      sizes='(max-width: 768px) 50vw, 100vw'
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default About;
