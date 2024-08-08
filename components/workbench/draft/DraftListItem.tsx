import Icon from '@/components/root/Icon';
import { formatTimestamphh } from '@/lib/utils';
import { Draft } from '@/types/draft';
import { Prompt } from '@/types/outline';
import { useMemo } from 'react';
import Menu from '../common/Menu';

type Props = { item: Draft; prompts: Prompt[] };

const DraftListItem = ({ item, prompts }: Props) => {
  const lastOpenTime = useMemo(
    () => formatTimestamphh(item.update_time),
    [item.update_time]
  );

  const prompt = useMemo(
    () => prompts.find((el) => el.id === item.prompt_id)?.title.split(':')[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.prompt_id]
  );

  return (
    <div className='flex-between h-11 cursor-pointer rounded-lg px-2 hover:bg-slate-200'>
      <div className='flex w-[200px] items-center gap-x-2'>
        <Icon
          src='/workbench/draft_file.svg'
          alt={item.title}
          width={24}
          height={24}
          className='size-5'
        />
        <h2 className='base-medium line-clamp-1 text-zinc-600'>{item.title}</h2>
      </div>
      <p className='w-[200px] text-xs text-neutral-400'> {prompt}</p>
      <p className='w-[200px] text-xs text-neutral-400'>
        Opened {lastOpenTime}
      </p>
      <Menu type='material' id={item.id} href={`/draft&feedback/${item.id}`} />
    </div>
  );
};

export default DraftListItem;
