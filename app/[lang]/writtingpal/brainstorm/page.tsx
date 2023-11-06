import List from '@/components/brainstorm/List';

export default function Brainstorm() {
  return (
    <section className='flex h-[calc(100%_-_68px)] w-full flex-col gap-y-4 overflow-y-auto bg-sectionBackground md:py-5 md:pl-5 md:pr-10'>
      <List />
      <List />

      <List />
    </section>
  );
}
