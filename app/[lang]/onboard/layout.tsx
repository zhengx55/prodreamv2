import { Button } from '@/components/ui/button';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import { ReactNode } from 'react';

export default async function OnboardLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return (
    <main className='relative flex h-full w-full flex-col overflow-auto'>
      <nav className='flex-between h-20 w-full shrink-0 bg-doc-secondary px-4'>
        <Image
          src='/logo/Prodream.png'
          width={140}
          height={30}
          alt='logo'
          className='h-auto w-40'
          priority
        />
        <Button className='bg-transparent' variant={'ghost'}>
          {dict.Onboard.SkipButton}
        </Button>
      </nav>
      {children}
    </main>
  );
}
