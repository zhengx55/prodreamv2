'use client';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
const OnboardModal = dynamic(() => import('@/components/resume/OnboardModal'), {
  ssr: false,
});
export default function ResumeLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const notFirstTime = usage.first_resume !== undefined && !usage.first_resume;
  return (
    <>
      {children}
      {!notFirstTime ? <OnboardModal /> : null}
    </>
  );
}
