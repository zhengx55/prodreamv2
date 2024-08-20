import Spacer from '@/components/root/Spacer';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

interface ButtonCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  href: string;
}

const ButtonCard: React.FC<ButtonCardProps> = ({
  iconSrc,
  iconAlt,
  title,
  description,
  href,
}) => (
  <Link href={href}>
    <div
      role='button'
      className='space-y-2 rounded-lg border border-zinc-200 bg-white p-4 hover:bg-slate-50 active:bg-zinc-200'
    >
      <div className='flex items-center gap-x-2'>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={24}
          height={24}
          className='size-5'
        />
        <h3 className='text-base font-medium text-zinc-800'>{title}</h3>
      </div>
      <p className='text-sm leading-normal text-zinc-600'>{description}</p>
    </div>
  </Link>
);

const ChatCover = () => {
  return (
    <div className='flex-center w-[900px] flex-1 flex-col self-center'>
      <Image
        width={100}
        height={100}
        priority
        className='size-20'
        alt='max'
        src='/chat/max.png'
      />
      <Spacer y='16' />
      <h2 className='text-xl font-medium text-zinc-800'>Max</h2>
      <Spacer y='8' />
      <p className='small-regular text-center text-zinc-800'>
        Hello, I&apos;m Max. I specialize in helping students craft compelling
        application essays for college
        <br /> admissions. Let me understand what you&apos;re working on.
      </p>
      <Spacer y='24' />
      <div className='flex gap-x-4'>
        <ButtonCard
          iconSrc='/workbench/nav_brainstorming.svg'
          iconAlt='Brainstorming'
          title='Brainstorming'
          description='Uncover your most compelling stories, experiences, and strengths'
          href='/brainstorming'
        />
        <ButtonCard
          iconSrc='/workbench/nav_outline.svg'
          iconAlt='Outline'
          title='Outline'
          description='Uncover your most compelling stories, experiences, and strengths'
          href='/outline'
        />
        <ButtonCard
          iconSrc='/workbench/nav_draft.svg'
          iconAlt='Draft'
          title='Draft'
          description='Uncover your most compelling stories, experiences, and strengths'
          href='/draft'
        />
      </div>
    </div>
  );
};

export default memo(ChatCover);
