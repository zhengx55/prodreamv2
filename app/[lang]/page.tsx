import type { Locale } from '@/i18n-config';

export default async function Home({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  return <></>;
}
