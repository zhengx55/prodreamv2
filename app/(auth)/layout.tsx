import { AnimatedLogo } from '@/components/root/AnimatedLogo';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function WrittingpalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='relative flex h-full w-full flex-col overflow-x-auto bg-auth bg-cover bg-center bg-no-repeat'>
      <div className='flex w-full pl-20 pt-10'>
        <AnimatedLogo pathFill='#fff' show />
      </div>
      {children}
    </div>
  );
}
