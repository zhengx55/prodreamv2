import DocumentList from '@/components/editor/history/List';
import Search from '@/components/editor/history/Search';
import Spacer from '@/components/root/Spacer';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
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
  const trans = await getTranslations('Homepage');
  const isInChina = params.lang === 'cn';

  return (
    <main className='relative flex h-full min-h-screen w-full flex-col items-center overflow-y-auto'>
      {isInChina ? <WelcomeModalCN /> : null}
      <DiscountModal />
      <Spacer y='75' />
      <Suspense>
        <Search t={t} lang={params.lang} />
      </Suspense>
      <Spacer y='30' />
      <Suspense>
        <DocumentList t={t} lang={params.lang} />
      </Suspense>
    </main>
  );
}
