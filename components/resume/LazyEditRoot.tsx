import CreatePanel from './CreatePanel';
import ReportPanel from './ReportPanel';

const LazyEditRoot = () => {
  return (
    <main className='relative flex flex-1 md:flex-row md:gap-x-1 md:overflow-hidden'>
      <CreatePanel />
      <ReportPanel />
    </main>
  );
};

export default LazyEditRoot;
