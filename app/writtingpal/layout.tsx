'use client';
import Navbar from '@/components/root/Navbar';
import Sidebar from '@/components/root/Sidebar';
import { store } from '@/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function WrittingpalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Provider store={store}>
      <Sidebar />
      <div className='flex h-full w-full flex-col overflow-x-auto'>
        <Navbar />
        {children}
      </div>
    </Provider>
  );
}
