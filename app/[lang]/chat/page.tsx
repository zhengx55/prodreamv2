import LeftArea from '@/components/chat/LeftArea';
import RightArea from '@/components/chat/RightArea';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className='flex h-screen'>
      <LeftArea />
      <RightArea />
    </div>
  );
}
