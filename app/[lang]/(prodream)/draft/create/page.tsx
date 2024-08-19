import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import Rightbar from '@/components/workbench/common/Rightbar';
import DraftContent from '@/components/workbench/draft/DraftContent';
import GenerateDraftSidebar from '@/components/workbench/draft/GenerateDraftSidebar';
import Link from 'next/link';

export default function Page() {
  return (
    <section className='flex flex-1 gap-x-2 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex-between h-[63px] border-b px-4'>
          <div className='flex items-center gap-x-2'>
            <Button role='button' className='size-max p-1' variant={'icon'}>
              <Link href={'/draft'}>
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
          <GenerateDraftSidebar />
          <DraftContent />
        </div>
      </div>
      <Rightbar />
    </section>
  );
}
