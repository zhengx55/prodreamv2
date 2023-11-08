import ReportPanel from '@/components/resume/ReportPanel';
import CreatePanel from '@/components/resume/CreatePanel';

export default function Page() {
  return (
    <main className='relative flex flex-1 md:flex-row md:gap-x-1 md:overflow-hidden'>
      <CreatePanel />
      <ReportPanel />
    </main>
  );
}
