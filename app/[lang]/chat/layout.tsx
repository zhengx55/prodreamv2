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
        background: 'linear-gradient(57deg, #D5E8F8 1.5%, #ABA3DF 80.7%)',
      }}
    >
      {children}
    </main>
  );
}
