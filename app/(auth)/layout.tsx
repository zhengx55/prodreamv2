'use client';
import Image from 'next/image';
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className='scale-down 2xl:scale-initial relative flex w-full flex-col overflow-x-auto overflow-y-auto sm:h-full'>
      <div
        className='z-100 absolute left-[40px] top-[40px] flex hidden h-[50px] w-[160px] cursor-pointer sm:block md:mb-0'
        onClick={() => {
          router.push('/');
        }}
      >
        <Image
          src='/logo/Prodream.png'
          width={150}
          height={50}
          alt='logo'
          className='z-100 absolute h-auto w-40 cursor-pointer sm:w-36'
          priority
        />
      </div>
      {children}
    </div>
  );
}
