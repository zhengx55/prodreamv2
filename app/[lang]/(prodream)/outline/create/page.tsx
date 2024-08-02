import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import GenerateOutlineSidebar from '@/components/workbench/outline/GenerateOutlineSidebar';
import OutlineContent from '@/components/workbench/outline/OutlineContent';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex-between h-[63px] border-b px-4'>
          <div className='flex items-center gap-x-2'>
            <Button role='button' className='size-max p-1' variant={'icon'}>
              <Link passHref href={'/outline'}>
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
            <h2 className='text-xl font-medium text-zinc-600'>Add Outline</h2>
          </div>
          <div className='flex items-center gap-x-2'>
            <Button role='button' variant={'icon'} className='size-max p-1'>
              <Download size={18} />
            </Button>
            <Button role='button'>
              <Icon
                alt='draft'
                src='/workbench/draft.svg'
                width={20}
                height={20}
                className='size-4'
                priority
              />
              Generate Draft
            </Button>
          </div>
        </div>
        <div className='flex flex-1 overflow-hidden'>
          <GenerateOutlineSidebar />
          <OutlineContent />
        </div>
      </div>
    </section>
  );
}
