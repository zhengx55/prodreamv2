import { AnimatedLogo } from '@/components/root/AnimatedLogo';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex h-full w-full flex-col overflow-x-auto'>
      <Image
        src='/auth.svg'
        fill
        alt='auth'
        priority
        objectFit='cover'
        className='z-0'
      />
      <div className='z-10 mb-5 flex w-full px-5 pt-5 md:mb-0 md:pl-20 md:pt-10'>
        <AnimatedLogo pathFill='#fff' show />
        <Toaster />
      </div>
      {children}
    </div>
  );
}
