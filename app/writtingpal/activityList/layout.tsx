'use client';
import ActListProvider from '@/context/ActListProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
const OnboardModal = dynamic(
  () => import('@/components/activityList/OnboardModal'),
  { ssr: false }
);

export default function ActListLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const notFirstTime =
    usage.first_activity_list !== undefined && !usage.first_activity_list;
  return (
    <ActListProvider>
      {children}
      {!notFirstTime ? <OnboardModal /> : null}
    </ActListProvider>
  );
}
