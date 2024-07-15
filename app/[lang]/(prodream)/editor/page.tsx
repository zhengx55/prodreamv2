import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
const DiscountModal = dynamic(
  () => import('@/components/editor/modal/Discount')
);

const WelcomeModalCN = dynamic(
  () => import('@/components/editor/modal/WelcomeCN')
);

export default async function Page({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  unstable_setRequestLocale(params.lang);
  const t = (await getDictionary(params.lang)).Editor;
  const isInChina = params.lang === 'cn';

  return (
    <main className='relative h-screen w-full py-6 pr-6'>
      {isInChina ? <WelcomeModalCN /> : null}
      <DiscountModal />
      <section className='flex size-full overflow-y-auto rounded-2xl border border-white/60 bg-white/60 shadow'></section>
    </main>
  );
}
