import Navbar from '@/components/onboard/Navbar';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

export default async function OnboardLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  const trans = await getTranslations("Homepage");
  
  return (
    <main className='relative flex h-full w-full flex-col overflow-auto '>
      <Navbar dict={dict} />
      {children}
    </main>
  );
}
