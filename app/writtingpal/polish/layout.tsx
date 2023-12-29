'use client';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
const OnboardModal = dynamic(() => import('@/components/polish/OnboardModal'));
export default function AIEditiorLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (usage.first_editior || usage.first_editior === undefined) {
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
