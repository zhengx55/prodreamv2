'use client';
import { AnimatedLogo } from '@/components/root/AnimatedLogo';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className='scale-down 2xl:scale-initial relative flex h-full w-full flex-col overflow-x-auto bg-black-700'>
      <Image alt='bg' src='/welcome/welcomebg.webp' fill priority />
      <div className='mb-5 flex w-full px-5 pt-5 md:mb-0 md:pl-20 md:pt-10'>
        <AnimatedLogo pathFill='#fff' show />
      </div>
      <AnimatePresence mode='wait'>{children}</AnimatePresence>;
    </main>
  );
}
