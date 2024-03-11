import GlobalInfoProvider from '@/components/root/GlobalInfoProvider';
import Sidebar from '@/components/root/Sidebar';
import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <GlobalInfoProvider>
      <Sidebar />
      <div className='hidden h-full w-full flex-col overflow-x-auto sm:flex md:overflow-y-hidden'>
        {children}
      </div>
    </GlobalInfoProvider>
  );
}
