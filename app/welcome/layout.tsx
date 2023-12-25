'use client';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className='scale-down 2xl:scale-initial relative flex h-full w-full flex-col overflow-x-auto bg-black-700 bg-onboard bg-cover bg-center bg-no-repeat'>
      <div className='mb-5 flex w-full px-5 pt-5 md:mb-0 md:pl-20 md:pt-10'>
        <Image
          src='/logo/ProdreamWhite.png'
          width={1920}
          height={920}
          alt='logo'
          className='z-10 h-auto w-40 sm:w-36'
          priority
        />
      </div>
      <AnimatePresence mode='wait'>{children}</AnimatePresence>;
    </main>
  );
}
