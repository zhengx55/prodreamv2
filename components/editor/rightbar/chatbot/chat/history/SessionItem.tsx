import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { formatTimestamphh_number } from '@/lib/utils';
import { chatHistoryItem } from '@/query/api';
import { ChatResponse } from '@/query/type';
import { useChatbot } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';

type Props = { item: ChatResponse };
const SessionItem = ({ item }: Props) => {
  const updateDeleteModal = useChatbot((state) => state.updateDeleteModal);
  const updateDeleteSession = useChatbot((state) => state.updateDeleteSession);
  const updateMessageList = useChatbot((state) => state.updateMessageList);
  const updateChatType = useChatbot((state) => state.updateChatType);

  const closeHistory = useChatbot((state) => state.closeHistory);
  const { mutateAsync: getSessionInfo } = useMutation({
    mutationFn: () => chatHistoryItem(item.id),
    onSuccess: (data) => {
      const messageList: {
        type: 'mine' | 'system';
        text: string;
        id: string;
        filename?: string | undefined;
      }[] = data.history.map((item) => {
        return {
          type: item.role === 'assistant' ? 'system' : 'mine',
          text: item.content,
          id: item.id,
        };
      });
      updateMessageList(messageList);
      updateChatType('pdf');
      closeHistory();
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });

  const handleClick = async () => {
    await getSessionInfo();
  };
  return (
    <div
      className='flex cursor-pointer flex-col gap-y-2 rounded p-2 hover:bg-stone-50'
      role='button'
      onClick={handleClick}
    >
      <div className='flex items-center gap-x-2'>
        <Icon
          alt='Chat-engine'
          className='size-6'
          src='/editor/chatbot/trigger.svg'
          height={24}
          width={24}
        />
        <h3 className='base-medium'>Jessica</h3>
      </div>
      <p className='small-regular self-end text-neutral-400'>
        {formatTimestamphh_number(item.update_time)}
      </p>
      <p className='small-regular line-clamp-2 text-neutral-400'>
        {item.first_message}
      </p>
      <Tooltip tooltipContent='Delete' side='top'>
        <Button
          onClick={async (e) => {
            e.stopPropagation();
            updateDeleteModal(true);
            updateDeleteSession(item.id);
          }}
          role='button'
          variant={'icon'}
          className='size-max self-end'
        >
          <Trash2 className='text-zinc-600' size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};
export default memo(SessionItem);
