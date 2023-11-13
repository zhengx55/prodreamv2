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
      <AnimatedLogo pathFill='#fff' className='absolute left-20 top-10' show />
      {children}
    </div>
  );
}
