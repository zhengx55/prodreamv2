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
        backgroundImage: "url('/onboarding/onBoardingBG.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </main>
  );
}
