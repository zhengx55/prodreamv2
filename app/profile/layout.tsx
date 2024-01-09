import GlobalInfoProvider from '@/components/root/GlobalInfoProvider';
import Navbar from '@/components/root/Navbar';
import ProfileSidebar from '@/components/root/ProfileSidebar';
import Sidebar from '@/components/root/Sidebar';
import { ReactNode } from 'react';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <GlobalInfoProvider>
      <Sidebar />
      <div className='hidden h-full w-full flex-col overflow-x-auto sm:flex md:overflow-y-hidden'>
        <Navbar />
        <main className='flex flex-1'>
          <ProfileSidebar />
          {children}
        </main>
      </div>
    </GlobalInfoProvider>
  );
}
