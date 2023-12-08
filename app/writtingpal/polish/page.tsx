'use client';
// import ReportPanel from '@/components/polish/ReportPanel';
import Rightbar from '@/components/polish/Rightbar';
import dynamic from 'next/dynamic';
import Loading from '@/components/root/CustomLoading';

const EssayPanel = dynamic(() => import('@/components/polish/EssayPanel'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Polish() {
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full md:overflow-hidden md:pr-[240px] '>
      <EssayPanel />
      <Rightbar />
    </main>
  );
}
