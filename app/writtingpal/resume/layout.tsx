'use client';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const OnboardModal = dynamic(() => import('@/components/resume/OnboardModal'), {
  ssr: false,
});
export default function ResumeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <OnboardModal />
    </>
  );
}
