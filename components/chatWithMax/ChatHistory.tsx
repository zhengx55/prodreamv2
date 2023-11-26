import { Loader2, Plus, X } from 'lucide-react';
import React, { memo } from 'react';
import { Button } from '../ui/button';
import { DialogClose } from '../ui/dialog';
import { useMaxChatContext } from '@/context/MaxChateProvider';
import { useGetChatHistory } from '@/query/query';

const ChatHistory = () => {
  const { setShowMenu, setCurrentHistory } = useMaxChatContext();
  const {
    data: chatHistory,
    isPending: isChatHistoryPending,
    isError: isChatHistoryError,
  } = useGetChatHistory();
  return (
    <div className='flex w-[30%] flex-col rounded-r-[20px] bg-shadow-200 p-3'>
      <div className='flex self-end'>
        <DialogClose asChild>
          <X className='cursor-pointer text-shadow-100 transition-transform hover:-translate-y-1' />
        </DialogClose>
      </div>
      <div className='flex flex-col gap-y-2 overflow-y-auto'>
        {!isChatHistoryPending && !isChatHistoryError ? (
          chatHistory.map((item) => (
            <div
              className='flex cursor-pointer items-center p-2.5 transition-opacity hover:opacity-50'
              key={item.session_id}
            >
              <div>
                <h1 className='small-semibold'>
                  {item.fun_type === 1 ? 'School selection' : 'All topics'}
                </h1>
                <p className='subtle-regular text-shadow-100'> {item.topic}</p>
              </div>
            </div>
          ))
        ) : (
          <Loader2 className=' animate-spin' />
        )}
      </div>

      <Button onClick={() => setShowMenu(true)} className='mt-auto'>
        <Plus /> New chat
      </Button>
    </div>
  );
};

export default memo(ChatHistory);
