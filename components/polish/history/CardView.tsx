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
      className='grid w-full grid-flow-row grid-cols-6 gap-4 px-6 2xl:grid-cols-7'
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
