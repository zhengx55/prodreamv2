import DocHistory from '@/components/polish/history';
import Spacer from '@/components/root/Spacer';
import dynamic from 'next/dynamic';
const Search = dynamic(() => import('@/components/polish/history/Search'));

export default function Page() {
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <Spacer y='75' />
      <Search />
      <Spacer y='48' />
      <DocHistory />
      <Spacer y='14' />
    </main>
  );
}
