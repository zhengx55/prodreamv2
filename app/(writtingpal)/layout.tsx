import GlobalInfoProvider from '@/components/root/GlobalInfoProvider';
import dynamic from 'next/dynamic';
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
  return (
    <GlobalInfoProvider>
      <DeviceProvider>{children}</DeviceProvider>
    </GlobalInfoProvider>
  );
}
