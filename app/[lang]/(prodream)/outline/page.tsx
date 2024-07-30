import SearchSection from '@/components/workbench/common/SearchSection';
import OutlineSection from '@/components/workbench/outline/OutlineSection';
import Image from 'next/image';

export default function Page() {
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex-between border-b px-6 py-2.5'>
          <div className='flex items-center gap-x-2'>
            <Image
              src='/workbench/nav_outline.svg'
              alt='Brainstorming Icon'
              width={24}
              height={24}
              className='size-6'
            />
            <h2 className='text-xl font-medium text-zinc-500'>Outline</h2>
          </div>
          <SearchSection />
        </div>
        <OutlineSection />
      </div>
    </section>
  );
}
