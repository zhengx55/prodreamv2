import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import GenerateOutlineSidebar from '@/components/workbench/outline/GenerateOutlineSidebar';
import OutlineContent from '@/components/workbench/outline/OutlineContent';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-1 flex-col rounded-lg bg-white'>
      <div className='flex-between h-[63px] border-b px-4'>
        <div className='flex items-center gap-x-2'>
          <Button role='button' className='size-max p-1' variant={'icon'}>
            <Link href={'/outline'}>
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
          <h2 className='text-xl font-medium text-zinc-600'>New Outline</h2>
        </div>
      </div>
      <div className='flex flex-1 overflow-hidden'>
        <GenerateOutlineSidebar />
        <OutlineContent />
      </div>
    </div>
  );
}
