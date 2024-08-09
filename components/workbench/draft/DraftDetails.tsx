'use client';
import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import DraftContent from '@/components/workbench/draft/DraftContent';
import RegenerateDraftSidebar from '@/components/workbench/draft/RegenerateDraftSidebar';
import { useGetDraftContent } from '@/query/draft';
import { Prompt } from '@/types/outline';
import { Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
type Props = { draft_id: string; prompts: Prompt[] };

const DraftDetails = ({ draft_id, prompts }: Props) => {
  const { data, isPending, isError } = useGetDraftContent(draft_id);
  if (isError) return null;
  if (isPending)
    return (
      <div className='flex-center flex-1 rounded-lg bg-white'>
        <Loader2 size={32} className='animate-spin text-indigo-500' />
      </div>
    );
  return (
    <div className='flex flex-1 flex-col rounded-lg bg-white'>
      <div className='flex-between h-[63px] border-b px-4'>
        <div className='flex items-center gap-x-2'>
          <Button role='button' className='size-max p-1' variant={'icon'}>
            <Link href={'/draft&feedback'}>
              <Icon
                alt='back'
                src='/workbench/left.svg'
                width={20}
                height={20}
                className='size-5'
                priority
              />
            </Link>
          </Button>
          <h2 className='text-xl font-medium text-zinc-600'>{data.title}</h2>
        </div>
        <Button
          onClick={async () => {}}
          variant={'icon'}
          className='size-max p-1'
        >
          <Download size={18} />
        </Button>
      </div>
      <div className='flex flex-1 overflow-hidden'>
        <RegenerateDraftSidebar data={data} prompts={prompts} />
        <DraftContent
          title={data.title}
          html={data.html}
          content={data.content}
        />
      </div>
    </div>
  );
};

export default DraftDetails;
