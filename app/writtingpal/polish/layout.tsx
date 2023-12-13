'use client';
import AIEditiorProvider from '@/context/AIEditiorProvider';
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
    if (Object.keys(usage).length > 0 && usage.first_editior) {
      setIsFirstTime(true);
    }
  }, [usage]);
  return (
    <AIEditiorProvider>
      {children}
      {isFirstTime ? <OnboardModal /> : null}
    </AIEditiorProvider>
  );
}
