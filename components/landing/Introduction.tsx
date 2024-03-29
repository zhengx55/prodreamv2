import { IntroductionInfo } from '@/constant';
import { HomePageDicType } from '@/types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Spacer from '../root/Spacer';
const CaptureProvider = dynamic(() => import('./CaptureProvider'));

const Introduction = ({ t, lang }: HomePageDicType) => {
  return (
    <section className='relative flex w-full justify-center px-4 py-10 sm:px-0 sm:py-20'>
      <div className='flex-center w-full flex-col sm:max-w-[1200px]'>
        {lang === 'en' ? (
          <h2 className='text-center font-baskerville text-[24px] leading-relaxed sm:text-[48px]'>
            {t.IntroductionInfo_theme_1}
            <br />{' '}
            <span className='sm:before:h-[40% relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:h-[40%] before:-skew-y-0 before:bg-[#F2C8FB] sm:before:top-[36px]'>
              {t.IntroductionInfo_theme_2}
            </span>
          </h2>
        ) : (
          <h2 className='text-center font-custom  text-[24px] leading-relaxed sm:text-[48px]'>
            {t.IntroductionInfo_theme_1} {t.IntroductionInfo_theme_2}
          </h2>
        )}

        <Spacer y='10' />
        <CaptureProvider event='ScreenIV'>
          <p className='small-regular sm:base-regular text-center text-shadow-100'>
            {t.IntroductionInfo_CaptureProvider}
          </p>
        </CaptureProvider>
        <Spacer y='40' />
        <div className='flex flex-col gap-y-6 sm:flex-row sm:gap-x-8 sm:gap-y-0'>
          <div className='flex w-full flex-col gap-y-8 sm:w-1/2'>
            {IntroductionInfo.filter(
              (_el, index) => index === 0 || index === 2
            ).map((item, idx) => {
              return (
                <div
                  className={`flex ${idx === 0 ? 'sm:h-[750px]' : 'sm:h-[630px]'} h-[440px] flex-col gap-y-4 rounded-xl bg-violet-500/5 p-5 sm:gap-y-8 sm:p-10`}
                  key={item.id}
                >
                  <h3 className='text-[20px] leading-snug sm:text-[24px]'>
                    {t[`IntroductionInfo_title_${idx === 0 ? 1 : 3}`]}
                  </h3>
                  <p className='text-xs leading-relaxed text-shadow-100 sm:text-[18px]'>
                    {t[`IntroductionInfo_description_${idx === 0 ? 1 : 3}`]}
                  </p>
                  <div className='relative h-full w-full overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={
                        t[`IntroductionInfo_title_${idx + 1}` as keyof typeof t]
                      }
                      className='object-contain'
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className='flex w-full flex-col gap-y-8 sm:w-1/2'>
            {IntroductionInfo.filter(
              (_el, index) => index === 1 || index === 3
            ).map((item, idx) => {
              return (
                <div
                  className={`flex ${idx === 1 ? 'sm:h-[750px]' : 'sm:h-[630px]'} h-[440px] flex-col gap-y-4 rounded-xl bg-violet-500/5 p-5 sm:gap-y-8 sm:p-10`}
                  key={item.id}
                >
                  <h3 className='text-[20px] leading-snug sm:text-[24px]'>
                    {t[`IntroductionInfo_title_${idx === 0 ? 2 : 4}`]}
                  </h3>
                  <p className='text-xs leading-relaxed text-shadow-100 sm:text-[18px]'>
                    {t[`IntroductionInfo_description_${idx === 0 ? 2 : 4}`]}
                  </p>
                  <div className='relative h-full w-full overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={t[`IntroductionInfo_title_${idx === 0 ? 2 : 4}`]}
                      fill
                      className='object-contain'
                      sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Introduction;
