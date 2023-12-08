'use client';
import BrainStormProvider from '@/context/BrainStormProvider';
import { ReactNode } from 'react';

export default function BrainstormLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <BrainStormProvider>{children}</BrainStormProvider>;
}
