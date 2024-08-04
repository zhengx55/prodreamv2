import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import { memo } from 'react';
import GenerateOutlineButton from './GenerateOutlineButton';

type Props = {};

const Step = ({
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
      <div className={`flex-center size-7 rounded ${colorClass}`}>{number}</div>
      <h2 className='base-medium text-zinc-800'>{text}</h2>
    </div>
    <p className='small-regular text-zinc-600'>{description}</p>
  </div>
);

const GenerateOutlineSidebar = (props: Props) => {
  return (
    <div className='flex h-full w-72 flex-col overflow-y-auto rounded-bl-lg border-r border-zinc-200 px-4 py-6'>
      <GenerateOutlineButton />
      <Spacer y='16' />
      <div className='w-full rounded-[10px] bg-slate-100 p-2'>
        <Image
          priority
          src='/workbench/generate_outline.png'
          width={250}
          height={250}
          alt='generate_outline'
          className='h-auto w-[224px]'
        />
        <p className='small-regular text-center text-zinc-600'>
          Quickly Generate Your Personalized Outline
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
        <p className='small-regular text-center text-zinc-600'>
          Click&nbsp;<span className='text-indigo-500'>Generate Outline</span>
          &nbsp;to quickly create your Outline!
        </p>
      </div>
    </div>
  );
};

export default memo(GenerateOutlineSidebar);
