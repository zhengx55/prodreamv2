import Spacer from '@/components/root/Spacer';
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
    <>
      <main className='relative hidden h-full w-full flex-col overflow-auto sm:flex'>
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
      <div className='flex flex-1 flex-col items-center bg-[#F6F4FF] sm:hidden'>
        {/* <NavBar lang={lang} t={dict.Homepage} /> */}
        <div className='relative h-[70%] w-full overflow-hidden'>
          <Image alt='mobile-banner' src='/Mobile.png' fill sizes='' />
        </div>
        <h1 className='px-2 text-center text-[28px] font-[600]'>
          Welcome to <span className='text-doc-primary'>Prodream!</span>
        </h1>
        <Spacer y='10' />
        <p className='px-2 text-center'>
          Mobile features are under development. Please log into your account on
          your computer to access full features
        </p>
      </div>
    </>
  );
}
