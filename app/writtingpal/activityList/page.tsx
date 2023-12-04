import ActivityMain from '@/components/activityList/ActivityMain';
import ActivityTop from '@/components/activityList/ActivityTop';

export default async function Page() {
  return (
    <section className='flex h-[calc(100vh_-var(--top-nav-bar-height))] w-full flex-col bg-sectionBackground p-4'>
      {/* top panel */}
      <ActivityTop />
      {/* main panel */}
      <ActivityMain />
    </section>
  );
}
