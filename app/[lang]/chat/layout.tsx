import { ReactNode } from 'react';

export default async function OnboardLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <main className='relative flex h-full min-h-screen w-full flex-col overflow-auto bg-gradient-to-tr from-blue-200 via-purple-200 via-purple-200 via-purple-400 to-blue-200'>
      {children}
    </main>
  );
}
