import { MaterialItem } from '@/types/brainstorm/types';
import { memo } from 'react';
import MaterialGridItem from './MaterialGridItem';

type Props = { list: MaterialItem[] };

const MaterialGrid = ({ list }: Props) => {
  return (
    <div className='flex-1'>
      <div className='flex flex-wrap gap-4'>
        {list.map((material, index) => (
          <MaterialGridItem key={material.id} item={material} />
        ))}
      </div>
    </div>
  );
};

export default memo(MaterialGrid);
