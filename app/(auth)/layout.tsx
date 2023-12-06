import { AnimatedLogo } from '@/components/root/AnimatedLogo';
import { Toaster } from '@/components/ui/toaster';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='scale-down 2xl:scale-initial relative flex h-full w-full flex-col overflow-x-auto bg-auth bg-cover bg-center bg-no-repeat'>
      <div className='mb-5 flex w-full px-5 pt-5 md:mb-0 md:pl-20 md:pt-10'>
        <AnimatedLogo pathFill='#fff' show />
        <Toaster />
      </div>
      {children}
    </div>
  );
}
