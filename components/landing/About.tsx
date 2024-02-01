import { AboutInfo } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const About = () => {
  return (
    <section className='relative flex w-full justify-center px-4 py-10 sm:px-0 sm:py-20'>
      <div className='flex-center w-full flex-col sm:max-w-[1200px]'>
        <h2 className='font-baskerville text-[24px] leading-relaxed sm:text-[48px]'>
          Write Better and{' '}
          <span className='relative inline-block before:absolute before:-inset-1 before:top-[18px] before:z-[-1] before:h-[40%] before:-skew-y-0 before:bg-[#D2DFFF] sm:before:top-[36px] sm:before:h-[40%]'>
            Faster
          </span>
        </h2>
        <Spacer y='10' />
        <p className='subtle-regular sm:base-regular text-center text-shadow-100'>
          Writing a good paper is time consuming, but every student has tons of
          work to get through. Some
          <br className='hidden sm:block' /> accept frustration. Others choose
          ProDream that speeds up their writing process
        </p>
        <Spacer y='40' />
        <div className='flex flex-col gap-y-9'>
          {AboutInfo.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`w-full ${index === 1 ? 'sm:flex-row-reverse' : ''}  flex h-[420px] flex-col items-center rounded-2xl bg-doc-primary/5 sm:h-[370px] sm:flex-row`}
              >
                <div className='flex w-full flex-col gap-y-4 p-4 sm:w-1/2 sm:p-10'>
                  <h3 className='text-[20px] leading-snug sm:text-[30px]'>
                    {item.title}
                  </h3>
                  <p className='text-[12px] leading-loose text-shadow-100 sm:text-regular'>
                    {item.description}
                  </p>
                </div>
                <div className='h-full w-full sm:w-1/2 sm:p-10'>
                  <div className='relative h-full w-full overflow-hidden'>
                    <Image
                      alt={item.title}
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
