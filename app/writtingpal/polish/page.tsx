'use client';
import EssayPanel from '@/components/polish/EssayPanel';
// import ReportPanel from '@/components/polish/ReportPanel';
import Rightbar from '@/components/polish/Rightbar';
import AIEditiorProvider from '@/context/AIEditiorProvider';

export default function Polish() {
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full md:overflow-hidden md:pr-[240px] '>
      <AIEditiorProvider>
        <EssayPanel />
        <Rightbar />
      </AIEditiorProvider>
    </main>
  );
}
