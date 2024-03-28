import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const DeviceProvider = dynamic(
  () => import('@/components/root/DeviceProvider'),
  { ssr: false }
);
export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <DeviceProvider>
      <div className='hidden h-full w-full flex-col overflow-x-auto sm:flex md:overflow-y-hidden'>
        {children}
      </div>
    </DeviceProvider>
  );
}
