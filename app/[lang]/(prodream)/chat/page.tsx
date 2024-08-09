import ChatFooter from '@/components/workbench/brainstorming/chat/page/ChatFooter';
import ChatSection from '@/components/workbench/brainstorming/chat/page/ChatSection';
import Image from 'next/image';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-slate-100 pb-4'>
        <div className='flex h-[63px] items-center gap-x-2 rounded-t-lg border-b border-gray-300 bg-white px-4'>
          <Image
            src='/workbench/nav_chat.svg'
            alt='agent'
            width={24}
            height={24}
            className='size-6'
          />
          <h2 className='text-xl font-medium text-zinc-800'>Max</h2>
        </div>
        <ChatSection />
        <ChatFooter />
      </div>
    </section>
  );
}
