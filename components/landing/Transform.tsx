import { TransformInfo } from '@/constant/landing';
import Image from 'next/image';
import { Button } from '../ui/button';

const Transform = () => {
  return (
    <section
      className='flex-center relative flex-1 py-28'
      style={{
        background:
          'linear-gradient(270deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, #D7E2F9 100.57%)',
      }}
    >
      <div className='w-[85%] space-y-9 2xl:w-[70%]'>
        <div className='flex h-[373px] rounded-2xl bg-white'>
          <Image
            src={TransformInfo.coverImg}
            priority
            alt=''
            className='h-full w-auto rounded-2xl'
            width={500}
            height={500}
          />
          <div className='flex flex-col justify-between gap-y-4 p-10'>
            <h2 className='text-[40px] font-semibold leading-[48px]'>
              {TransformInfo.heading}
            </h2>
            <p className='text-base font-medium text-black/50'>
              {TransformInfo.description}
            </p>
            <Button variant={'landing'} size={'expand'} className='self-end'>
              {TransformInfo.contactButton}
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4 2xl:grid-cols-4'>
          {TransformInfo.features.map((item) => {
            return (
              <div
                key={item.title}
                className='space-y-3 rounded-2xl bg-gradient-to-b from-white to-white p-8'
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.66) 0%, rgba(255, 255, 255, 0.00) 139.35%)',
                }}
              >
                <Image
                  alt={item.title}
                  src={item.image}
                  width={100}
                  height={100}
                  className='mx-auto h-auto w-[60px]'
                />
                <h3 className='text-center text-lg font-semibold'>
                  {item.title}
                </h3>
                <p className='text-center text-sm font-medium text-black/50'>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Transform;
