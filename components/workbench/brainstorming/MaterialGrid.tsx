import { memo } from 'react';
import MaterialGridItem from './MaterialGridItem';

type Props = {};

const MaterialGrid = (props: Props) => {
  return (
    <div className='flex-1'>
      <div className='flex flex-wrap gap-4'>
        {Array.from({ length: 25 }).map((_, index) => (
          <MaterialGridItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default memo(MaterialGrid);
