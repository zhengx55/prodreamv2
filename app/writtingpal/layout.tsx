import GlobalInfoProvider from '@/components/root/GlobalInfoProvider';
import Navbar from '@/components/root/Navbar';
import Sidebar from '@/components/root/Sidebar';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const TutorialSheet = dynamic(() => import('@/components/tutorial'), {
  ssr: false,
});

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
      <Sidebar />
      <div className='relative hidden h-full w-full flex-col overflow-x-auto sm:flex sm:overflow-y-hidden'>
        <Navbar />
        <TutorialSheet />
        {children}
      </div>
      {/* TODO: Mobile */}
      <div className='flex sm:hidden'></div>
    </GlobalInfoProvider>
  );
}
