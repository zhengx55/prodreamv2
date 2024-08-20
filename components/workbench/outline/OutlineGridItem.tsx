import Icon from '@/components/root/Icon';
import { formatTimestamphh } from '@/lib/utils';
import { OutlineItem, Prompt } from '@/types/outline';
import { useRouter } from 'next/navigation';
import { memo, useMemo } from 'react';
import Markdown from 'react-markdown';
import Menu from '../common/Menu';
type Props = { item: OutlineItem; prompts: Prompt[] };

const OutlineGridItem = ({ item, prompts }: Props) => {
  const lastOpenTime = useMemo(
    () => formatTimestamphh(item.update_time),
    [item.update_time]
  );
  const { push } = useRouter();

  return (
    <div className='flex w-[330px] select-none flex-col justify-between rounded-lg border border-gray-300'>
      <div className='group h-[164px] cursor-pointer rounded-t-lg bg-gray-100 px-2 pt-2'>
        <div
          onClick={() => {
            push(`/outline/${item.id}`);
          }}
          className='size-full space-y-2.5 bg-white p-2 group-hover:bg-slate-50'
        >
          <span className='small-regular rounded bg-green-50 px-2.5 py-0.5 text-green-500'>
            {
              prompts
                ?.find((prompt) => prompt.id === item.prompt_id)
                ?.title.split(':')[0]
            }
          </span>
          <Markdown className='prose prose-sm line-clamp-3 text-zinc-600 prose-p:mb-0 prose-ul:my-0'>
            {item.content.slice(0, 100)}
          </Markdown>
        </div>
      </div>
      <footer className='flex-between rounded-b-lg border-t border-gray-300 bg-white px-4 py-2.5'>
        <div className='space-y-1'>
          <div className='flex items-center gap-x-2'>
            <Icon
              src='/workbench/outline_file.svg'
              alt={item.title}
              width={24}
              height={24}
              className='size-5'
            />
            <h2 className='base-medium text-zinc-600'>
              {item.title.length > 20
                ? item.title.slice(0, 20) + '...'
                : item.title}
            </h2>
          </div>
          <p className='text-xs text-neutral-400'>Opened {lastOpenTime}</p>
        </div>
        <Menu type='outline' id={item.id} href={`/outline/${item.id}`} />
      </footer>
    </div>
  );
};

export default memo(OutlineGridItem);
