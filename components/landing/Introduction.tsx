import { IntroductionInfo } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const Introduction = () => {
  return (
    <section className='relative flex w-full justify-center px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col sm:max-w-[1200px]'>
        <h2 className='text-center font-baskerville leading-relaxed sm:text-[48px]'>
          Faster Writing With
          <br /> Higher Quality
        </h2>
        <Spacer y='10' />
        <p className='base-regular text-center text-shadow-100'>
          Faster Writing Doesn&apos;t Mean Lower Quality
        </p>
        <Spacer y='40' />
        <div className='flex flex-col sm:flex-row sm:gap-x-8'>
          <div className='flex w-full flex-col gap-y-8 sm:w-1/2'>
            {IntroductionInfo.filter(
              (el, index) => index === 0 || index === 2
            ).map((item, idx) => {
              return (
                <div
                  className={`flex ${idx === 0 ? 'h-[750px]' : 'h-[630px]'} flex-col gap-y-4 rounded-xl bg-doc-primary/5 sm:gap-y-8 sm:p-10`}
                  key={item.id}
                >
                  <h3 className='text-[20px] leading-snug sm:text-[24px]'>
                    {item.title}
                  </h3>
                  <p className='text-regular leading-relaxed text-shadow-100 sm:text-[18px]'>
                    {item.description}
                  </p>
                  <div className='relative h-full w-full overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes='(max-width: 768px) 50vw, 100vw'
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
                  className={`flex ${idx === 1 ? 'h-[750px]' : 'h-[630px]'} flex-col gap-y-4 rounded-xl bg-doc-primary/5 sm:gap-y-8 sm:p-10`}
                  key={item.id}
                >
                  <h3 className='text-[20px] leading-snug sm:text-[24px]'>
                    {item.title}
                  </h3>
                  <p className='text-regular leading-relaxed text-shadow-100 sm:text-[18px]'>
                    {item.description}
                  </p>
                  <div className='relative h-full w-full overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes='(max-width: 768px) 50vw, 100vw'
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
