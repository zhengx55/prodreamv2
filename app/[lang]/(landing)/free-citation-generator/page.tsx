import NavBar from '@/components/landing/navbar/NavBar';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Page({
  params: { lang },
  searchParams: { from },
}: {
  params: { lang: Locale };
  searchParams: { from: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <main className='relative flex w-full touch-pan-y flex-col overflow-x-hidden sm:overflow-x-auto'>
      <NavBar search_param={from} lang={lang} t={dict.Homepage} />
    </main>
  );
}
