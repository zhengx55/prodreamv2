import EssayPanel from '@/components/polish/EssayPanel';
import Rightbar from '@/components/polish/rightbar';

export default function Polish() {
  return (
    <main className='relative hidden h-[calc(100%_-var(--top-nav-bar-height))] w-full overflow-hidden pr-[240px] sm:flex'>
      <EssayPanel />
      <Rightbar />
    </main>
  );
}
