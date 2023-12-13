'use client';
import BrainStormProvider from '@/context/BrainStormProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
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
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (
      Object.keys(usage).length > 0 &&
      (usage.first_brainstorm || usage.first_brainstorm === undefined)
    ) {
      setIsFirstTime(true);
    }
  }, [usage]);

  return (
    <BrainStormProvider>
      {children}
      {isFirstTime ? <OnboardModal /> : null}
    </BrainStormProvider>
  );
}
