'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div className='relative flex h-full w-full overflow-auto sm:flex-row'>
      {children}
    </div>
  );
}
