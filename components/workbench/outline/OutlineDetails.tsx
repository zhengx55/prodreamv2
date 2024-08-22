'use client';
import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import GenerateDraftButton from '@/components/workbench/outline/GenerateDraftButton';
import OutlineContent from '@/components/workbench/outline/OutlineContent';
import RegenerateOutlineSidebar from '@/components/workbench/outline/regenerate/RegenerateOutlineSidebar';
import { useGetOutlineContent } from '@/query/outline';
import { Prompt } from '@/types/outline';
import { Download, Loader2 } from 'lucide-react';
import Link from 'next/link';
import SavingIndicator from '../editor/SavingIndicator';
type Props = { outline_id: string; prompts: Prompt[] };

const OutlineDetails = ({ outline_id, prompts }: Props) => {
  const { data, isPending, isError } = useGetOutlineContent(outline_id);
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
            <Link href={'/outline'}>
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
          <SavingIndicator />
        </div>
        <div className='flex items-center gap-x-2'>
          <Button variant={'icon'} className='size-max p-1'>
            <Download size={18} />
          </Button>
          <GenerateDraftButton id={outline_id} />
        </div>
      </div>
      <div className='flex flex-1 overflow-hidden'>
        <RegenerateOutlineSidebar data={data} prompts={prompts} />
        <OutlineContent
          title={data.title}
          content={data.content}
          html={data.html}
        />
      </div>
    </div>
  );
};

export default OutlineDetails;
