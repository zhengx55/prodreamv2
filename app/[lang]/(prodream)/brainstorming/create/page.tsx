import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/workbench/brainstorming/MaterialForm';
import Link from 'next/link';

export default function Page() {
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex items-center gap-x-2 border-b px-4 py-2.5'>
          <Button role='button' className='size-max p-1' variant={'icon'}>
            <Link passHref href={'/brainstorming'}>
              <Icon
                alt='back'
                src='/workbench/left.svg'
                width={20}
                height={20}
                className='size-5'
                priority
              />
            </Link>
          </Button>
          <h2 className='text-xl font-medium text-zinc-600'>
            Create New Material
          </h2>
        </div>
        <div className='flex flex-1 overflow-y-auto bg-slate-100'>
          <MaterialForm type='create' />
        </div>
      </div>
    </section>
  );
}
