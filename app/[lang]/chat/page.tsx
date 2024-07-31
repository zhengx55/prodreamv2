import LeftTopMenu from '@/components/chat/LeftTopMenu';
import MainContent from '@/components/chat/MainContent';
import { Locale } from '@/i18n-config';
export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className='relative flex h-screen'>
      <div className='absolute left-[8px] top-[8px]'>
        <LeftTopMenu />
      </div>
      <MainContent />
    </div>
  );
}
