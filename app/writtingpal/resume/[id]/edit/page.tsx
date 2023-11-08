'use client';
import ReportPanel from '@/components/resume/ReportPanel';
import CreatePanel from '@/components/resume/CreatePanel';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function Page() {
  return (
    <Provider store={store}>
      <main className='relative flex flex-1 md:flex-row md:gap-x-1 md:overflow-hidden'>
        <CreatePanel />
        <ReportPanel />
      </main>
    </Provider>
  );
}
