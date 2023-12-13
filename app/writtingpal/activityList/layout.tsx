'use client';
import ActListProvider from '@/context/ActListProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const OnboardModal = dynamic(
  () => import('@/components/activityList/OnboardModal'),
  { ssr: false }
);

export default function ActListLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (Object.keys(usage).length > 0 && usage.first_activity_list) {
      setIsFirstTime(true);
    }
  }, [usage]);
  return (
    <ActListProvider>
      {children}
      {isFirstTime ? <OnboardModal /> : null}
    </ActListProvider>
  );
}
