import React, { memo, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import ChatTrigger from './ChatTrigger';
import Image from 'next/image';
import { useMaxChatContext } from '@/context/MaxChateProvider';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const ChatMenu = dynamic(() => import('./ChatMenu'), {
  ssr: false,
  loading: () => (
    <div className='flex-center w-[70%] flex-col'>
      <Loader2 className='animate-spin' />
    </div>
  ),
});
const MessageList = dynamic(() => import('./MessageList'), {
  ssr: false,
  loading: () => (
    <div className='flex-center w-[70%] flex-col'>
      <Loader2 className='animate-spin' />
    </div>
  ),
});

const ChatHistory = dynamic(() => import('./ChatHistory'), {
  ssr: false,
});
type Props = { expandSidebar: boolean };

const ChatModal = ({ expandSidebar }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { showMenu, setShowMenu, setCurrentSession } = useMaxChatContext();

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={() => {
        if (modalOpen) {
          // 关闭窗口时清楚共享的数据
          setShowMenu(true);
          setCurrentSession('');
        }
        setModalOpen((prev) => !prev);
      }}
    >
      {expandSidebar ? (
        <ChatTrigger />
      ) : (
        <DialogTrigger asChild>
          <div className='flex-center ml-2 mt-8 h-11 w-11 cursor-pointer rounded-[47px] rounded-bl-none bg-chat transition-transform hover:-translate-y-1'>
            <Image
              alt='max'
              src='/max.png'
              className='h-auto w-5'
              width={0}
              height={0}
            />
          </div>
        </DialogTrigger>
      )}
      <DialogContent className='flex gap-0 border-0 p-0 outline-none md:h-[700px] md:w-[900px]'>
        {showMenu ? <ChatMenu /> : <MessageList />}
        <ChatHistory />
      </DialogContent>
    </Dialog>
  );
};

export default memo(ChatModal);
