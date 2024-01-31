import { AboutInfo } from '@/constant';
import Image from 'next/image';
import Spacer from '../root/Spacer';

const About = () => {
  return (
    <section className='relative flex w-full justify-center px-4 pt-20 sm:px-0 sm:py-[170px]'>
      <div className='flex-center w-full flex-col sm:max-w-[1200px]'>
        <h2 className='font-baskerville leading-relaxed sm:text-[48px]'>
          Write Better and Faster
        </h2>
        <Spacer y='10' />
        <p className='base-regular text-center text-shadow-100'>
          Writing a good paper is time consuming, but every student has tons of
          work to get through. Some
          <br /> accept frustration. Others choose ProDream that speeds up their
          writing process
        </p>
        <Spacer y='40' />
        <div className='flex flex-col gap-y-9'>
          {AboutInfo.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`w-full ${index === 1 ? 'flex-row-reverse' : ''}  flex items-center rounded-2xl bg-doc-primary/5 sm:h-[370px]`}
              >
                <div className='flex w-1/2 flex-col gap-y-4 p-10'>
                  <h3 className='text-[30px] leading-snug'>{item.title}</h3>
                  <p className=' text-regular leading-loose text-shadow-100'>
                    {item.description}
                  </p>
                </div>
                <div className='h-full w-1/2 p-10'>
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
