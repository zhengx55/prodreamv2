'use client';

import { IDocDetail } from '@/query/type';
import { memo } from 'react';
import Card from './Card';

type Props = {
  list: IDocDetail[];
  setCurrentItem: (value: IDocDetail) => void;
  toggleDeleteModal: (value: boolean) => void;
  toggleMoveModal: (value: boolean) => void;
};
const CardView = ({
  list,
  setCurrentItem,
  toggleDeleteModal,
  toggleMoveModal,
}: Props) => {
  return (
    <ul role='list' className='grid w-[1100px] grid-flow-row grid-cols-5 gap-4'>
      {list.map((item) => (
        <Card
          toggleDeleteModal={toggleDeleteModal}
          item={item}
          toggleMoveModal={toggleMoveModal}
          key={item.id}
          setCurrentItem={setCurrentItem}
        />
      ))}
    </ul>
  );
};
export default memo(CardView);
