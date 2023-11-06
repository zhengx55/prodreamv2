import { ReactNode } from 'react';

export default function WorkStationLayout({
  children,
}: {
  children: ReactNode;
}) {
  <div className='h-full w-full bg-red-200'>{children}</div>;
}
