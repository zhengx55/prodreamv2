import Rightbar from '@/components/polish/rightbar';
import Loading from '@/components/root/CustomLoading';
import dynamic from 'next/dynamic';

const EssayPanel = dynamic(() => import('@/components/polish/EssayPanel'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Polish() {
  return (
    <main className='relative hidden h-[calc(100%_-var(--top-nav-bar-height))] w-full overflow-hidden pr-[240px] sm:flex'>
      <EssayPanel />
      <Rightbar />
    </main>
  );
}
