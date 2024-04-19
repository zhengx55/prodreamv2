import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { formatTimestamphh_number } from '@/lib/utils';
import { ChatResponse } from '@/query/type';
import { useChatbot } from '@/zustand/store';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';

type Props = { item: ChatResponse };
const SessionItem = ({ item }: Props) => {
  const updateDeleteModal = useChatbot((state) => state.updateDeleteModal);
  const updateDeleteSession = useChatbot((state) => state.updateDeleteSession);
  return (
    <div className='flex flex-col gap-y-2 rounded p-2 hover:bg-stone-50'>
      <div className='flex items-center gap-x-2'>
        <Icon
          alt='Chat-engine'
          className='size-4'
          src='/editor/chatbot/trigger.svg'
          height={16}
          width={16}
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
