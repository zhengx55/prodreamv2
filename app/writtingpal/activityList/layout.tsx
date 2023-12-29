'use client';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
const OnboardModal = dynamic(
  () => import('@/components/activityList/OnboardModal')
);

export default function ActListLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (usage.first_activity_list || usage.first_activity_list === undefined) {
      setIsFirstTime(true);
    }
  }, [usage]);
  return (
    <LazyMotionProvider>
      {children}
      {isFirstTime ? <OnboardModal /> : null}
    </LazyMotionProvider>
  );
}
