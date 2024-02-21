import Image from 'next/image';
import { ReactNode } from 'react';

export default function VerifyLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex-center relative flex flex-1'>
      <Image
        className='absolute left-10 top-10 h-auto w-36'
        width={140}
        height={40}
        priority
        src='/logo/prodream.png'
        alt='logo'
      />
      {children}
    </main>
  );
}
