import GlobalInfoProvider from '@/components/root/GlobalInfoProvider';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const DeviceProvider = dynamic(
  () => import('@/components/root/DeviceProvider'),
  { ssr: false }
);
export default function WrittingpalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  if (!cookieStore.get('token')) {
    redirect('/login');
  }

  return (
    <GlobalInfoProvider>
      <DeviceProvider>{children}</DeviceProvider>
    </GlobalInfoProvider>
  );
}
