import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { formatTimestamphh_number } from '@/lib/utils';
import { chatHistoryItem } from '@/query/api';
import { ChatResponse } from '@/query/type';
import { AIResearchMessage, EditorDictType } from '@/types';
import { useChatbot } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';

type Props = { t: EditorDictType; item: ChatResponse; close: () => void };
const ResearchHistoryItem = ({ t, item, close }: Props) => {
  const updateDeleteModal = useChatbot((state) => state.updateDeleteModal);
  const updateDeleteSession = useChatbot((state) => state.updateDeleteSession);
  const updateCurrentResearchSession = useChatbot(
    (state) => state.updateCurrentResearchSession
  );
  const updateResearchList = useChatbot((state) => state.updateResearchList);
  const mutation = useMutation({
    mutationFn: () => chatHistoryItem(item.id),
    onSuccess: (data) => {
      updateCurrentResearchSession(item.id);
      const historyResearchList: AIResearchMessage[] = data.history
        .filter((item) => item.role === 'assistant')
        .map((item) => {
          return {
            id: item.id,
            message: item.content,
            query: data.title,
            reference: item.contexts ?? [],
          };
        });
      updateResearchList(historyResearchList);
      close();
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });

  const historyDetail = async () => {
    await mutation.mutateAsync();
  };

  return (
    <div
      role='button'
      onClick={historyDetail}
      className='flex cursor-pointer flex-col gap-y-2 rounded-lg p-2 hover:bg-stone-50'
    >
      <div className='flex-between'>
        <h3 className='small-medium line-clamp-1 max-w-[50%] text-zinc-700'>
          {item.first_message}
        </h3>
        <p className='small-regular text-neutral-400'>
          {formatTimestamphh_number(item.create_time)}
        </p>
      </div>
      <p className='small-regular line-clamp-3 text-neutral-400'>
        {item.first_response}
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
export default memo(ResearchHistoryItem);
