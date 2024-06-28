'use client';
import { ReactNode } from 'react';
import '../../globals.css';
export default function H5CNMobileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className='h-full w-full overflow-auto'>{children}</main>;
}
