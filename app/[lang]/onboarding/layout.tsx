import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

export default async function OnboardLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const trans = await getTranslations('Homepage');

  return (
    <main
      className='relative flex h-full min-h-screen w-full flex-col overflow-auto'
      style={{
        backgroundImage: "url('/onboarding/onBoardingBG.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </main>
  );
}
