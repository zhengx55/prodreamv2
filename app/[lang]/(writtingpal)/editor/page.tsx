import DocumentList from '@/components/editor/history/List';
import Spacer from '@/components/root/Spacer';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const DiscountModal = dynamic(
  () => import('@/components/editor/modal/Discount')
);
const Search = dynamic(() => import('@/components/editor/history/Search'));

export default function Page() {
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <DiscountModal />
      <Spacer y='75' />
      <Search />
      <Spacer y='30' />
      <Suspense>
        <DocumentList />
      </Suspense>
    </main>
  );
}
