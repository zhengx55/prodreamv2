import { Suspense, lazy } from 'react';
import Loading from '@/components/root/CustomLoading';

const ReportPanel = lazy(() => import('@/components/resume/ReportPanel'));
const CreatePanel = lazy(() => import('@/components/resume/CreatePanel'));
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
