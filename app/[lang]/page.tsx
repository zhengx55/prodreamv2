import InputPanel from '@/components/editor/InputPanel';
import ReportPanel from '@/components/editor/ReportPanel';
import Rightbar from '@/components/root/Rightbar';
import { Divider } from '@nextui-org/divider';

export default async function Home({}) {
  return (
    <main className='relative flex w-full flex-1 flex-col bg-sectionBackground md:flex-row md:gap-x-1 md:overflow-hidden md:pr-40'>
      <InputPanel />
      <Divider orientation='vertical' />
      <ReportPanel />
      <Rightbar />
    </main>
  );
}
