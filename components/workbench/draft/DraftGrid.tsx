import { Draft } from '@/types/draft';
import { Prompt } from '@/types/outline';
import DraftGridItem from './DraftGridItem';

type Props = { list: Draft[]; prompts: Prompt[] };

const DraftGrid = ({ list, prompts }: Props) => {
  return (
    <div className='flex-1'>
      <div className='flex flex-wrap gap-4'>
        {list.map((material) => (
          <DraftGridItem prompts={prompts} key={material.id} item={material} />
        ))}
      </div>
    </div>
  );
};

export default DraftGrid;
