'use client';
import ActListProvider from '@/context/ActListProvider';
import { ReactNode } from 'react';

export default function ActListLayout({ children }: { children: ReactNode }) {
  return <ActListProvider>{children}</ActListProvider>;
}
