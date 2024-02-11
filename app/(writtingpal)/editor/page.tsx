import Spacer from '@/components/root/Spacer';
import dynamic from 'next/dynamic';
const Search = dynamic(() => import('@/components/editor/history/Search'));
const DocumentList = dynamic(() => import('@/components/editor/history/List'));

export default function Page() {
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <Spacer y='75' />
      <Search />
      <Spacer y='48' />
      <DocumentList />
    </main>
  );
}
