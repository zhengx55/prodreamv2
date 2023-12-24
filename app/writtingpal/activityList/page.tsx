import ActivityMain from '@/components/activityList/ActivityMain';
import ActivityTop from '@/components/activityList/ActivityTop';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';

export default async function Page() {
  return (
    <section className='flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col bg-sectionBackground p-4'>
      <LazyMotionProvider>
        {/* top panel */}
        <ActivityTop />
        {/* main panel */}
        <ActivityMain />
      </LazyMotionProvider>
    </section>
  );
}
