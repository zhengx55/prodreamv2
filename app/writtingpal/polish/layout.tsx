'use client';
import AIEditiorProvider from '@/context/AIEditiorProvider';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const OnboardModal = dynamic(() => import('@/components/polish/OnboardModal'), {
  ssr: false,
});
export default function AIEditiorLayout({ children }: { children: ReactNode }) {
  return (
    <AIEditiorProvider>
      {children}
      <OnboardModal />
    </AIEditiorProvider>
  );
}
