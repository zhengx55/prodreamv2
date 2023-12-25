'use client';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
const OnboardModal = dynamic(
  () => import('@/components/activityList/OnboardModal'),
  { ssr: false }
);

export default function ActListLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (
      Object.keys(usage).length > 0 &&
      (usage.first_activity_list || usage.first_activity_list === undefined)
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
