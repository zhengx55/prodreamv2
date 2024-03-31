import DocumentList from '@/components/editor/history/List';
import Search from '@/components/editor/history/Search';
import Spacer from '@/components/root/Spacer';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const DiscountModal = dynamic(
  () => import('@/components/editor/modal/Discount')
);

export default async function Page({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const t = (await getDictionary(params.lang)).Editor;
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <DiscountModal />
      <Spacer y='75' />
      <Search t={t} lang={params.lang} />
      <Spacer y='30' />
      <Suspense>
        <DocumentList t={t} lang={params.lang} />
      </Suspense>
    </main>
  );
}
