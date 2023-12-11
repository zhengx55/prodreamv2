'use client';
import ActListProvider from '@/context/ActListProvider';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

import ActivityTourProvider from '@/components/activityList/ActivityTour';

const OnboardModal = dynamic(
  () => import('@/components/activityList/OnboardModal'),
  { ssr: false }
);

export default function ActListLayout({ children }: { children: ReactNode }) {
  return (
    <ActListProvider>
      <ActivityTourProvider>
        {children}
        {/* <OnboardModal /> */}
      </ActivityTourProvider>
    </ActListProvider>
  );
}
