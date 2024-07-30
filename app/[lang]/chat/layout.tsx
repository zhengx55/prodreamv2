import { Locale } from '@/i18n-config';
import { ReactNode } from 'react';

export default async function OnboardLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <main
      className='relative flex h-full min-h-screen w-full flex-col overflow-auto'
      style={{
        background: 'linear-gradient(180deg, #C9D8F8 0%, #F2F1FF 100%)',
      }}
    >
      {children}
    </main>
  );
}
