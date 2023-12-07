import InputPanel from '@/components/polish/InputPanel';
// import ReportPanel from '@/components/polish/ReportPanel';
import Rightbar from '@/components/polish/Rightbar';

export default async function Polish() {
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full md:overflow-hidden md:pr-[240px] '>
      <InputPanel />
      <Rightbar />
    </main>
  );
}
