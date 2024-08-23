import { InformationInfo } from '@/constant/landing';
import Image from 'next/image';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

type Props = {};

const Information = (props: Props) => {
  return (
    <section
      style={{
        background:
          'linear-gradient(270deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, #D7E2F9 100.57%)',
      }}
      className='flex-center relative flex-1 pb-[130px] pt-[70px]'
    >
      <Image
        alt=''
        src='/landing/info/container.png'
        fill
        sizes='(min-width: 808px) 50vw, 100vw'
      />
      <div className='flex-center z-10 w-[85%] flex-col 2xl:w-[70%]'>
        <h2 className='text-center text-[40px] font-semibold leading-[48px]'>
          {InformationInfo.heading}
        </h2>
        <Spacer y='16' />
        <p className='text-center text-base font-medium text-black/50'>
          {InformationInfo.description}
        </p>
        <Spacer y='16' />
        <Button variant={'landing'} size={'expand'} className='mx-auto'>
          {InformationInfo.button}
        </Button>
        <Spacer y='50' />
        <div className='flex-between h-[418px] gap-x-10'>
          <Image
            src={InformationInfo.coverImg}
            priority
            alt=''
            width={500}
            height={500}
            className='h-full w-[auto]'
          />
          <div className='grid grid-cols-2 grid-rows-2 gap-6'>
            {InformationInfo.features.map((item) => {
              return (
                <div
                  className='space-y-2 rounded-2xl bg-gradient-to-r from-gray-100 to-white p-6 backdrop-blur-2xl'
                  key={item.title}
                >
                  <Image
                    alt={item.title}
                    src={item.image}
                    width={100}
                    height={100}
                    className='h-[40px] w-auto'
                  />
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-sm font-medium text-black/50'>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
