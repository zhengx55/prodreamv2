import DeviceProvider from '@/components/root/DeviceProvider';
import Spacer from '@/components/root/Spacer';
import type { Locale } from '@/i18n-config';
import Image from 'next/image';
import { ReactNode } from 'react';

export default async function WrittingpalLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <>
      <main className='hidden h-full w-full overflow-x-auto overflow-y-hidden md:flex'>
        <DeviceProvider lang={lang}>
          <div className='relative flex h-full w-full flex-col '>
            {children}
          </div>
        </DeviceProvider>
      </main>
      <div className='flex flex-1 flex-col items-center bg-[#F6F4FF] md:hidden'>
        <div className='relative h-[70%] w-full overflow-hidden'>
          <Image
            alt='mobile-banner'
            src='/Mobile.png'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
          />
        </div>
        <h1 className='px-2 text-center text-[28px] font-[600]'>
          Welcome to <span className='text-violet-500'>Prodream!</span>
        </h1>
        <Spacer y='10' />
        <p className='px-2 text-center'>
          Mobile features are under development. Please log into your account on
          your computer to access full features
        </p>
      </div>
    </>
  );
}
