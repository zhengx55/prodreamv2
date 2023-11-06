import Navbar from '@/components/root/Navbar';
import Sidebar from '@/components/root/Sidebar';
import { ReactNode } from 'react';

export default function WrittingpalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className='flex h-full flex-1 flex-col'>
        <Navbar />
        {children}
      </div>
    </>
  );
}
