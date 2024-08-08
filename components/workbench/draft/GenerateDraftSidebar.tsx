import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import { memo } from 'react';
import { Step } from '../common/SidebarStep';
import GenerateDraftButton from './GenerateDraftButton';

const GenerateDraftSidebar = () => {
  return (
    <aside className='flex h-full w-[272px] flex-col justify-between overflow-y-auto rounded-bl-lg border-r border-zinc-200 p-2'>
      <div className='w-full rounded-[10px] bg-slate-100 p-2'>
        <Image
          priority
          src='/workbench/generate_outline.png'
          width={250}
          height={250}
          alt='generate_outline'
          className='mx-auto size-[180px]'
        />
        <p className='small-regular text-center text-zinc-600'>
          Generate Your Personal <br /> Statement and Secure Your Desired Offer
        </p>
        <Spacer y='16' />
        <Step
          number={1}
          colorClass='bg-violet-50 text-indigo-500'
          text='Select Outline'
          description='Select the outline you want to expand and refine. Your personal statement will be developed based on this outline.'
        />
        <Spacer y='16' />
      </div>
      <footer className='space-y-4'>
        <p className='small-regular text-center text-zinc-600'>
          Click&nbsp;
          <strong className='text-indigo-500'>Generate</strong>
          &nbsp;to quickly create your personal statement!
        </p>
        <GenerateDraftButton />
      </footer>
    </aside>
  );
};

export default memo(GenerateDraftSidebar);
