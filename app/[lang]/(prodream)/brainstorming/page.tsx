import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MaterialSection from '@/components/workbench/brainstorming/MaterialSection';
import { PlusCircle, Search } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <section className='flex flex-1 px-2 pb-2'>
      <div className='size-full rounded-lg bg-white'>
        <div className='flex-between border-b px-6 py-2.5'>
          <div className='flex items-center gap-x-2'>
            <Image
              src='/workbench/nav_brainstorming.svg'
              alt='Brainstorming Icon'
              width={24}
              height={24}
              className='size-6'
            />
            <h2 className='text-xl font-medium text-zinc-500'>Know yourself</h2>
          </div>
          <div className='flex items-center gap-x-2'>
            <div className='flex w-64 items-center rounded-lg border px-2.5'>
              <Search color='#726fe7' size={16} className='' />
              <Input
                type='search'
                name='search_materials'
                className='h-10 border-none pl-2 pr-0 focus-visible:ring-0'
                placeholder='Search materials'
              />
            </div>
            <Button className='size-max rounded-lg px-4 py-2' role='button'>
              <PlusCircle size={24} />
              Add Material
            </Button>
          </div>
        </div>
        <MaterialSection />
      </div>
    </section>
  );
}
