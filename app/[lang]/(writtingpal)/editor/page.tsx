import DocumentList from '@/components/editor/history/List';
import Spacer from '@/components/root/Spacer';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const DiscountModal = dynamic(
  () => import('@/components/editor/modal/Discount')
);
const Search = dynamic(() => import('@/components/editor/history/Search'));

export default async function Page({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const dict = (await getDictionary(params.lang)).Editor;
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <DiscountModal />
      <Spacer y='75' />
      <Search />
      <Spacer y='30' />
      <Suspense>
        <DocumentList t={dict} lang={params.lang} />
      </Suspense>
    </main>
  );
}
