import EssayPanel from '@/components/polish/EssayPanel';
import Rightbar from '@/components/polish/rightbar';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';

export default function Polish() {
  return (
    <LazyMotionProvider>
      <main className='relative hidden h-[calc(100%_-var(--top-nav-bar-height))] w-full overflow-hidden pr-[240px] sm:flex'>
        <EssayPanel />
        <Rightbar />
      </main>
    </LazyMotionProvider>
  );
}
