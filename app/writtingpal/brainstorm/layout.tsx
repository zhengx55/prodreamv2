'use client';
import BrainStormProvider from '@/context/BrainStormProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const OnboardModal = dynamic(
  () => import('@/components/brainstorm/OnboardModal'),
  {
    ssr: false,
  }
);
export default function BrainstormLayout({
  children,
}: {
  children: ReactNode;
}) {
  const usage = useAppSelector(selectUsage);
  const notFirstTime =
    usage.first_brainstorm !== undefined && !usage.first_brainstorm;
  return (
    <BrainStormProvider>
      {children}
      {!notFirstTime ? <OnboardModal /> : null}
    </BrainStormProvider>
  );
}
