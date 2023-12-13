'use client';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
const OnboardModal = dynamic(() => import('@/components/resume/OnboardModal'), {
  ssr: false,
});
export default function ResumeLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (
      Object.keys(usage).length > 0 &&
      (usage.first_resume || usage.first_resume === undefined)
    ) {
      setIsFirstTime(true);
    }
  }, [usage]);
  return (
    <>
      {children}
      {isFirstTime ? <OnboardModal /> : null}
    </>
  );
}
