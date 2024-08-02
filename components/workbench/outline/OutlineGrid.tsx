import { EssayItem } from '@/types/outline/types';
import OutlineGridItem from './OutlineGridItem';

type Props = { list: EssayItem[] };

const OutlineGrid = ({ list }: Props) => {
  return (
    <div className='flex-1'>
      <div className='flex flex-wrap gap-4'>
        {list.map((material) => (
          <OutlineGridItem key={material.id} item={material} />
        ))}
      </div>
    </div>
  );
};

export default OutlineGrid;
