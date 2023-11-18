import InputPanel from '@/components/activityList/InputPanel';
import OutputPanel from '@/components/activityList/OutputPanel';

export default function Page({}) {
  return (
    <section className='flex h-[calc(100%_-var(--top-nav-bar-height))] w-full overflow-y-auto bg-sectionBackground md:flex-row'>
      {/* left panel */}
      <InputPanel />
      {/* right panel */}
      <OutputPanel />
    </section>
  );
}
