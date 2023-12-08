'use client';
import AIEditiorProvider from '@/context/AIEditiorProvider';
import { ReactNode } from 'react';

export default function AIEditiorLayout({ children }: { children: ReactNode }) {
  return <AIEditiorProvider>{children}</AIEditiorProvider>;
}
