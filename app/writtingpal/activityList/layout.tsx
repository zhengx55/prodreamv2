'use client';
import ActListProvider from '@/context/ActListProvider';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const OnboardModal = dynamic(
  () => import('@/components/activityList/OnboardModal'),
  { ssr: false }
);

export default function ActListLayout({ children }: { children: ReactNode }) {
  return (
    <ActListProvider>
      {children}
      {/* <OnboardModal /> */}
    </ActListProvider>
  );
}
