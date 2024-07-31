import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import { memo } from 'react';
import GenerateOutlineButton from './GenerateOutlineButton';

type Props = {};

const Step = ({
  number,
  colorClass,
  text,
}: {
  number: number;
  colorClass: string;
  text: string;
}) => (
  <div className='flex items-center gap-x-2 rounded-[10px] bg-white p-2'>
    <div className={`flex-center size-7 rounded ${colorClass}`}>{number}</div>
    <h2 className='base-medium text-zinc-800'>{text}</h2>
  </div>
);

const GenerateSection = (props: Props) => {
  return (
    <div className='flex h-full w-72 flex-col overflow-y-auto rounded-bl-lg border-r border-zinc-200 px-4 py-6'>
      <GenerateOutlineButton />
      <Spacer y='16' />
      <div className='w-full rounded-[10px] bg-slate-50 p-2'>
        <Image
          priority
          src='/workbench/generate_outline.png'
          width={250}
          height={250}
          alt='generate_outline'
          className='h-auto w-[224px]'
        />
        <p className='small-regular text-center text-zinc-600'>
          I&apos;m here to help you effortlessly
        </p>
        <Spacer y='16' />
        <Step
          number={1}
          colorClass='bg-orange-50 text-amber-500'
          text='Select Prompt'
        />
        <Spacer y='8' />
        <Step
          number={2}
          colorClass='bg-violet-50 text-indigo-500'
          text='Selected Materials'
        />
      </div>
    </div>
  );
};

export default memo(GenerateSection);
