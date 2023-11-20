import ReportPanel from '@/components/resume/ReportPanel';
import CreatePanel from '@/components/resume/CreatePanel';
import { Suspense } from 'react';
import Loading from '@/components/root/CustomLoading';

export default function Page() {
  return (
    <main className='relative flex flex-1 md:flex-row md:gap-x-1 md:overflow-hidden'>
      <Suspense fallback={<Loading />}>
        <CreatePanel />
        <ReportPanel />
      </Suspense>
    </main>
  );
}
