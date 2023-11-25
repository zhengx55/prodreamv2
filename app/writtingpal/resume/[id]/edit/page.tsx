import CreatePanel from '@/components/resume/CreatePanel';
import { Suspense, lazy } from 'react';
import Loading from '@/components/root/CustomLoading';

const ReportPanel = lazy(() => import('@/components/resume/ReportPanel'));

export default function Page() {
  return (
    <main className='relative flex flex-1 md:flex-row md:gap-x-1 md:overflow-hidden'>
      <CreatePanel />
      <Suspense fallback={<Loading />}>
        <ReportPanel />
      </Suspense>
    </main>
  );
}
