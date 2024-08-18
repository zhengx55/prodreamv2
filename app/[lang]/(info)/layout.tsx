import InnerSidebar from '@/components/info/common/InnerSidebar';
import Sidebar from '@/components/info/common/Sidebar';
import { ReactNode } from 'react';

export default async function InfoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='hidden size-full bg-gradient-to-b from-[#c9d7f7] to-[#f2f0ff] p-2 md:flex'>
      <Sidebar />
      <div className='flex flex-1'>
        <InnerSidebar />
        <div className='flex flex-1 overflow-y-auto rounded-br-lg rounded-tr-lg bg-slate-50 p-4'>
          {children}
        </div>
      </div>
    </div>
  );
}
