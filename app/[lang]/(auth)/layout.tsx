import { Locale } from '@/i18n-config';
import { ReactNode } from 'react';

export default async function AuthLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className='relative flex flex-1 overflow-auto sm:flex-row'>
      {children}
      <div className='relative hidden h-full min-h-screen w-1/2 justify-center bg-white sm:flex sm:flex-col sm:items-center sm:justify-center'></div>
    </div>
  );
}
