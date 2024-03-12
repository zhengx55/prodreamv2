import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const DeviceProvider = dynamic(
  () => import('@/components/root/DeviceProvider'),
  { ssr: false }
);
export default async function WrittingpalLayout({
  children,
  params: { lang },
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);
  return <DeviceProvider>{children}</DeviceProvider>;
}
