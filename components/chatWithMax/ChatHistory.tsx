import { Loader2, Plus, Trash2, X } from 'lucide-react';
import React, { memo } from 'react';
import { Button } from '../ui/button';
import { DialogClose } from '../ui/dialog';
import { useMaxChatContext } from '@/context/MaxChateProvider';
import { useGetChatHistory } from '@/query/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSession } from '@/query/api';
import { useToast } from '../ui/use-toast';

const ChatHistory = () => {
  const { setShowMenu, setCurrentChatType, setCurrentSession } =
    useMaxChatContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    data: chatHistory,
    isPending: isChatHistoryPending,
    isError: isChatHistoryError,
  } = useGetChatHistory();

  const { mutateAsync: deleteHistory } = useMutation({
    mutationFn: (session_id: string) => deleteSession(session_id),
    onSuccess: () => {
      toast({
        description: 'Successfully delete chat history.',
      });
      queryClient.invalidateQueries({ queryKey: ['chat_history'] });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  const deleteChatHistory = async (session_id: string) => {
    await deleteHistory(session_id);
  };

  const selectChatHandler = async (session_id: string, fun_type: 1 | 2) => {
    setCurrentSession(session_id);
    setCurrentChatType(fun_type);
    setShowMenu(false);
  };
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
              onClick={() => selectChatHandler(item.session_id, item.func_type)}
              className='flex-between cursor-pointer p-2.5 transition-opacity hover:opacity-50'
              key={item.session_id}
            >
              <div>
                <h1 className='small-semibold'>
                  {item.func_type === 1 ? 'School selection' : 'All topics'}
                </h1>
                <p className='subtle-regular text-shadow-100'> {item.topic}</p>
              </div>
              <Trash2
                onClick={() => deleteChatHistory(item.session_id)}
                size={20}
                className='text-shadow-100'
              />
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
