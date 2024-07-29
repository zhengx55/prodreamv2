import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MaterialGrid from '@/components/workbench/brainstorming/MaterialGrid';
import { List, PlusCircle, Search, SortAsc } from 'lucide-react';
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
        <div className='flex flex-col gap-y-4 p-4'>
          <div className='flex-between'>
            <h3 className='text-xl text-zinc-500'>Recently</h3>
            <div className='flex gap-x-2'>
              <Button role='button' className='size-max p-1' variant={'icon'}>
                <List size={24} />
              </Button>
              <Button role='button' className='size-max p-1' variant={'icon'}>
                <SortAsc size={24} />
              </Button>
            </div>
          </div>
          <MaterialGrid />
        </div>
      </div>
    </section>
  );
}
