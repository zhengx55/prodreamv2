import { Separator } from '@/components/ui/separator';
import { Draft } from '@/types/draft';
import { Prompt } from '@/types/outline';
import { memo } from 'react';
import DraftListItem from './DraftListItem';

type Props = { list: Draft[]; prompts: Prompt[] };

const DraftList = ({ list, prompts }: Props) => {
  return (
    <div className='flex-1'>
      <Separator orientation='horizontal' className='bg-gray-200' />
      <div className='mt-2 space-y-2'>
        {list.map((outline) => (
          <DraftListItem prompts={prompts} key={outline.id} item={outline} />
        ))}
      </div>
    </div>
  );
};

export default memo(DraftList);
