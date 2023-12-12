'use client';
import AIEditiorProvider from '@/context/AIEditiorProvider';
import { selectUsage } from '@/store/reducers/usageSlice';
import { useAppSelector } from '@/store/storehooks';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
const OnboardModal = dynamic(() => import('@/components/polish/OnboardModal'), {
  ssr: false,
});
export default function AIEditiorLayout({ children }: { children: ReactNode }) {
  const usage = useAppSelector(selectUsage);
  const notFirstTime =
    usage.first_editior !== undefined && !usage.first_editior;
  return (
    <AIEditiorProvider>
      {children}
      {!notFirstTime ? <OnboardModal /> : null}
    </AIEditiorProvider>
  );
}
