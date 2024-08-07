import { Separator } from '@/components/ui/separator';
import { OutlineItem, Prompt } from '@/types/outline/types';
import { memo } from 'react';
import OutlineListItem from './OutlineListItem';

type Props = { list: OutlineItem[]; prompts: Prompt[] };

const OutlineList = ({ list, prompts }: Props) => {
  return (
    <div className='flex-1'>
      <Separator orientation='horizontal' className='bg-gray-200' />
      <div className='mt-2 space-y-2'>
        {list.map((outline) => (
          <OutlineListItem prompts={prompts} key={outline.id} item={outline} />
        ))}
      </div>
    </div>
  );
};

export default memo(OutlineList);
