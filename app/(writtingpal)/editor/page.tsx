import DocumentList from '@/components/editor/history/List';
import Spacer from '@/components/root/Spacer';
import dynamic from 'next/dynamic';
const Search = dynamic(() => import('@/components/editor/history/Search'));

export default function Page() {
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <Spacer y='75' />
      <Search />
      <Spacer y='30' />
      <DocumentList />
    </main>
  );
}
