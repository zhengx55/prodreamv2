import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import { memo } from 'react';
import GenerateOutlineButton from './GenerateOutlineButton';

const Step = memo(
  ({
    number,
    colorClass,
    text,
    description,
  }: {
    number: number;
    colorClass: string;
    text: string;
    description: string;
  }) => (
    <div className='space-y-2 rounded-lg bg-white p-2'>
      <div className='flex items-center gap-x-2'>
        <div className={`small-regular rounded px-2.5 py-1 ${colorClass}`}>
          Step {number}
        </div>
        <h2 className='base-medium text-zinc-800'>{text}</h2>
      </div>
      <p className='text-sm leading-relaxed text-zinc-600'>{description}</p>
    </div>
  )
);

const GenerateOutlineSidebar = () => {
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
          Quickly Generate Your
          <br /> Personalized Outline
        </p>
        <Spacer y='16' />
        <Step
          number={1}
          colorClass='bg-orange-50 text-amber-500'
          text='Select Prompt'
          description='Select the topic you want to write about. Max will generate it for you based on the latest topics.'
        />
        <Spacer y='8' />
        <Step
          number={2}
          colorClass='bg-violet-50 text-indigo-500'
          text='Selected Materials'
          description='Choose your personal experience materials. These materials will be used as sources to generate the outline.'
        />
        <Spacer y='16' />
      </div>
      <footer className='space-y-4'>
        <p className='small-regular text-center text-zinc-600'>
          Click&nbsp;
          <strong className='text-indigo-500'>Generate Outline</strong>
          &nbsp;to quickly create your Outline!
        </p>
        <GenerateOutlineButton />
      </footer>
    </aside>
  );
};

export default memo(GenerateOutlineSidebar);
