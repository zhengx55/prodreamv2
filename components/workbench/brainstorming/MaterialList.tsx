import { Separator } from '@/components/ui/separator';
import { MaterialItem } from '@/types/brainstorm/types';
import { memo } from 'react';
import MaterialListItem from './MaterialListItem';

type Props = { list: MaterialItem[] };

const MaterialList = ({ list }: Props) => {
  return (
    <div className='flex-1'>
      <Separator orientation='horizontal' className='bg-gray-200' />
      <div className='mt-2 space-y-2'>
        {list.map((material) => (
          <MaterialListItem key={material.id} item={material} />
        ))}
      </div>
    </div>
  );
};

export default memo(MaterialList);
