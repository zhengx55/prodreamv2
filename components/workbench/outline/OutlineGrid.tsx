import { OutlineItem, Prompt } from '@/types/outline/types';
import OutlineGridItem from './OutlineGridItem';

type Props = { list: OutlineItem[]; prompts: Prompt[] };

const OutlineGrid = ({ list, prompts }: Props) => {
  return (
    <div className='flex-1'>
      <div className='flex flex-wrap gap-4'>
        {list.map((material) => (
          <OutlineGridItem
            prompts={prompts}
            key={material.id}
            item={material}
          />
        ))}
      </div>
    </div>
  );
};

export default OutlineGrid;
