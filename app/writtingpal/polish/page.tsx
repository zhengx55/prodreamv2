import InputPanel from '@/components/polish/InputPanel';
import ReportPanel from '@/components/polish/ReportPanel';
import Rightbar from '@/components/root/Rightbar';
import { Separator } from '@/components/ui/separator';

export default async function Polish() {
  return (
    <main className='relative flex flex-1 flex-col bg-sectionBackground md:flex-row md:gap-x-1 md:overflow-hidden md:pr-40'>
      <InputPanel />
      <Separator orientation='vertical' className='bg-shadow-border' />
      <ReportPanel />
      <Rightbar />
    </main>
  );
}
