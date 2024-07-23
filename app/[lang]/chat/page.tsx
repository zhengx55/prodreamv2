import LeftArea from '@/components/chat/LeftArea';
import MainContent from '@/components/chat/MainContent';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className='flex h-screen'>
      <LeftArea />
      <MainContent />
    </div>
  );
}
