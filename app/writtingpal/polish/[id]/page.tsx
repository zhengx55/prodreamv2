import EssayPanel from '@/components/polish/EssayPanel';
import Rightbar from '@/components/polish/rightbar';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full justify-center overflow-hidden pr-[240px]'>
      <EssayPanel id={params.id} />
      <Rightbar />
    </main>
  );
}
