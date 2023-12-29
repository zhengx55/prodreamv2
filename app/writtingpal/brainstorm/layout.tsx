'use client';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
const OnboardModal = dynamic(
  () => import('@/components/brainstorm/OnboardModal')
);
export default function BrainstormLayout({
  children,
}: {
  children: ReactNode;
}) {
  const usage = useAppSelector(selectUsage);
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (usage.first_brainstorm || usage.first_brainstorm === undefined) {
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
