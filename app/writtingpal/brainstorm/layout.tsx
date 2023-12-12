'use client';
import BrainStormProvider from '@/context/BrainStormProvider';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const OnboardModal = dynamic(
  () => import('@/components/brainstorm/OnboardModal'),
  {
    ssr: false,
  }
);
export default function BrainstormLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <BrainStormProvider>
      {children}
      <OnboardModal />
    </BrainStormProvider>
  );
}
