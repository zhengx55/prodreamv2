import Spacer from '@/components/root/Spacer';
import Image from 'next/image';

export default function Page() {
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white'>
        <div className='flex h-[63px] items-center gap-x-2 border-b border-gray-300 px-4'>
          <Image
            src='/workbench/nav_chat.svg'
            alt='agent'
            width={24}
            height={24}
            className='size-6'
          />
          <h2 className='text-xl font-medium text-zinc-800'>Max</h2>
        </div>
        <div className='flex-center flex-1 flex-col'>
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
            Hello, I&apos;m Max. I specialize in helping students craft
            compelling application essays for college
            <br /> admissions. Let me understand what you&apos;re working on.
          </p>
          <Spacer y='24' />
          <div className='flex gap-x-4'>
            <div
              role='button'
              className='w-[254px] space-y-2 rounded-lg border border-zinc-200 p-4 hover:bg-slate-50 active:bg-zinc-200'
            >
              <div className='flex items-center gap-x-2'>
                <Image
                  src='/workbench/nav_brainstorming.svg'
                  alt='Brainstorming Icon'
                  width={24}
                  height={24}
                  className='size-6'
                />
                <h3 className='text-base font-medium text-zinc-800'>
                  Brainstorming
                </h3>
              </div>
              <p className='text-xs leading-tight text-zinc-600'>
                Uncover your most compelling stories, experiences, and strengths
              </p>
            </div>
            <div
              role='button'
              className='w-[254px] space-y-2 rounded-lg border border-zinc-200 p-4 hover:bg-slate-50 active:bg-zinc-200'
            >
              <div className='flex items-center gap-x-2'>
                <Image
                  src='/workbench/nav_outline.svg'
                  alt='Outline Icon'
                  width={24}
                  height={24}
                  className='size-6'
                />
                <h3 className='text-base font-medium text-zinc-800'>Outline</h3>
              </div>
              <p className='text-xs leading-tight text-zinc-600'>
                Uncover your most compelling stories, experiences, and strengths
              </p>
            </div>
            <div
              role='button'
              className='w-[254px] space-y-2 rounded-lg border border-zinc-200 p-4 hover:bg-slate-50 active:bg-zinc-200'
            >
              <div className='flex items-center gap-x-2'>
                <Image
                  src='/workbench/nav_draft.svg'
                  alt='Draft Icon'
                  width={24}
                  height={24}
                  className='size-6'
                />
                <h3 className='text-base font-medium text-zinc-800'>Draft</h3>
              </div>
              <p className='text-xs leading-tight text-zinc-600'>
                Uncover your most compelling stories, experiences, and strengths
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
