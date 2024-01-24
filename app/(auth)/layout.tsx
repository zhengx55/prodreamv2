'use client';
import Image from 'next/image';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className='scale-down 2xl:scale-initial relative flex sm:h-full w-full flex-col overflow-x-auto overflow-y-auto'>
      <div className='hidden sm:block absolute left-[40px] top-[40px] flex w-[160px] h-[50px] md:mb-0 cursor-pointer' onClick={()=>{router.push('/')}}>
        <Image
          src='/logo/Prodream.png'
          width={150}
          height={50}
          alt='logo'
          className='absolute z-10 h-auto w-40 sm:w-36'
          priority
        />
      </div>
      {children}
    </div>
  );
}
