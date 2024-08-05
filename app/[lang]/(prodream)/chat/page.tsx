import ChatCover from '@/components/workbench/chat_main/ChatCover';
import ChatFooter from '@/components/workbench/chat_main/ChatFooter';
import ChatMessageList from '@/components/workbench/chat_main/ChatMessageList';
import Image from 'next/image';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const chat_option = searchParams.option;
  return (
    <section className='flex flex-1 overflow-y-hidden px-2 pb-2'>
      <div className='flex flex-1 flex-col rounded-lg bg-white pb-4'>
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
        {!chat_option ? <ChatCover /> : <ChatMessageList />}
        <ChatFooter />
      </div>
    </section>
  );
}
