import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { formatTimestamphh_number } from '@/lib/utils';
import { useDeleteSession } from '@/query/query';
import { ChatResponse } from '@/query/type';
import { Trash2 } from 'lucide-react';
import { memo } from 'react';

type Props = { item: ChatResponse };
const SessionItem = ({ item }: Props) => {
  const { mutateAsync: deleteHistoryItem, isPending } = useDeleteSession();
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
      <Button
        onClick={async (e) => {
          e.stopPropagation();
          await deleteHistoryItem(item.id);
        }}
        disabled={isPending}
        role='button'
        variant={'icon'}
        className='size-max self-end'
      >
        <Trash2 className='text-zinc-600' size={18} />
      </Button>
    </div>
  );
};
export default memo(SessionItem);
