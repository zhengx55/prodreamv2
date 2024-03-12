import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative flex h-full w-full overflow-auto sm:flex-row'>
      {children}
      <div className='relative hidden h-full w-1/2 bg-[#FAF9FF] sm:flex sm:flex-col sm:items-center sm:pt-20'>
        <h1 className='font-baskerville font-[400] sm:text-[40px] 2xl:text-[48px]'>
          Transform your academic <br />
          writing journey
        </h1>
        <Spacer y='80' />
        <Image
          src='/auth/auth.png'
          alt='logo'
          priority
          width={800}
          height={200}
          className='h-auto w-[75%]'
        />
      </div>
    </div>
  );
}
