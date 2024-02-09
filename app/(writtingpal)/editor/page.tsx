import DocHistory from '@/components/editor/history';
import Spacer from '@/components/root/Spacer';

export default function Page() {
  return (
    <main className='relative flex h-full w-full flex-col items-center overflow-y-auto'>
      <Spacer y='75' />
      <DocHistory />
    </main>
  );
}
