'use client';

import useInviewCapture from '@/hooks/useInViewCapture';
import { ReactNode } from 'react';

type Props = { event: string; children: ReactNode };
const CaptureProvider = ({ event, children }: Props) => {
  const { ref } = useInviewCapture(event);
  return <div ref={ref}>{children}</div>;
};
export default CaptureProvider;
