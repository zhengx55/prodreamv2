import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import GoogleSignin from '@/components/auth/GoogleSignin';
import SwitchTab from './SwitchTab';

const CNPanel = ({ children, from }: { children: ReactNode; from: string }) => {
  const transAuth = useTranslations('Auth');

  return (
    <div className='relative flex h-full min-h-screen w-full flex-col bg-white px-4 md:w-1/2 md:items-center md:justify-center md:px-0'>
      <div className='absolute top-4 flex w-full md:top-16 md:w-[600px]'>
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
      <div className='mt-5 flex w-full items-center justify-center md:mt-5 md:w-[600px]'>
        <div className='flex-grow border-t border-neutral-300'></div>
        <p className='subtle-regular md:small-regular px-2 text-center text-neutral-400'>
          {transAuth('Login_using_a_third_party_account')}
        </p>
        <div className='flex-grow border-t border-neutral-300'></div>
      </div>
      <div className='mt-2 flex w-full justify-center md:w-[500px]'>
        <GoogleSignin searchParam={from} lang={'cn'} minimalStyle={true} />
      </div>
    </div>
  );
};

export default CNPanel;
