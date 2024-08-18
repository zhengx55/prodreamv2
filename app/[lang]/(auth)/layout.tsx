import AuthAnimatePanel from '@/components/auth/AuthAnimatePanel';
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
    <div className='relative flex size-full overflow-auto sm:flex-row'>
      {children}
      <AuthAnimatePanel />
    </div>
  );
}
