import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function OnboardLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <main className='relative flex h-full w-full flex-col overflow-auto'>
      <nav className='flex-between h-20 w-full bg-doc-secondary px-4'>
        <Image
          src='/logo/Prodream.png'
          width={140}
          height={30}
          alt='logo'
          className='h-auto w-40'
          priority
        />
        <Button className='bg-transparent' variant={'ghost'}>
          Skip for now
        </Button>
      </nav>
      {children}
    </main>
  );
}
