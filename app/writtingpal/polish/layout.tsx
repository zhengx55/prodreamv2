'use client';
import AIEditiorHistoryProvider from '@/context/AIEditiorHistoryProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
const OnboardModal = dynamic(() => import('@/components/polish/OnboardModal'), {
  ssr: false,
});
export default function AIEditiorLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const [isFirstTime, setIsFirstTime] = useState(false);
  useEffect(() => {
    if (
      Object.keys(usage).length > 0 &&
      (usage.first_editior || usage.first_editior === undefined)
    ) {
      setIsFirstTime(true);
    }
  }, [usage]);
  return (
    <AIEditiorHistoryProvider>
      {children}
      {isFirstTime ? <OnboardModal /> : null}
    </AIEditiorHistoryProvider>
  );
}
