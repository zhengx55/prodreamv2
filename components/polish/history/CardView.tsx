'use client';

import { IDocDetail } from '@/query/type';
import { memo } from 'react';
import Card from './Card';

type Props = {
  list: IDocDetail[];
  setCurrentItem: (value: IDocDetail) => void;
  toggleDeleteModal: (value: boolean) => void;
};
const CardView = ({ list, setCurrentItem, toggleDeleteModal }: Props) => {
  return (
    <ul
      role='list'
      className='grid w-[1100px] grid-flow-row grid-cols-5 gap-4 px-6'
    >
      {list.map((item) => (
        <Card
          toggleDeleteModal={toggleDeleteModal}
          item={item}
          key={item.id}
          setCurrentItem={setCurrentItem}
        />
      ))}
    </ul>
  );
};
export default memo(CardView);
