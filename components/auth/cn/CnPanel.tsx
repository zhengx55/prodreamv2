import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import { ReactNode } from 'react';
import Privacy from '../Privacy';
import SwitchTab from './SwitchTab';

const CNPanel = ({ children }: { children: ReactNode }) => {
  return (
    <div className='relative flex h-full w-full flex-col bg-white px-4 md:w-1/2 md:items-center md:justify-center md:px-0'>
      <div className='absolute top-4 flex w-full md:top-16 md:w-[500px]'>
        <Image
          src='/logo/Prodream.png'
          width={140}
          height={30}
          alt='logo'
          className='h-auto w-40'
          priority
        />
      </div>
      <Spacer y='100' className='block md:hidden' />
      <SwitchTab lang={'cn'} />
      <Spacer y='60' className='hidden md:block' />
      <Spacer y='30' className='block md:hidden' />
      {children}
      <div className='mt-5 flex w-full items-center gap-x-2 md:mt-5 md:w-[500px]'>
        <p className='subtle-regular md:small-regular text-neutral-400 '>
          使用第三方账号登录
        </p>
        <span className='relative h-6 w-6 overflow-hidden rounded-full bg-neutral-300 p-0.5'>
          <Image
            alt='google'
            src='/auth/google_dark.svg'
            width={20}
            height={20}
            className='h-auto w-auto'
          />
        </span>
      </div>
      <Privacy lang={'cn'} />
    </div>
  );
};

export default CNPanel;
