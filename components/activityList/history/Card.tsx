import { Activity } from '@/query/type';
import React from 'react';

type Props = { item: Activity };

const Card = ({ item }: Props) => {
  return (
    <div className='flex w-[360px] flex-col gap-y-2 rounded-[10px] border border-shadow-border p-4'>
      <h2 className='base-semibold line-clamp-2'>Activity 1: {item.title}</h2>
      <p className='base-regular line-clamp-5'>{item.text}</p>
      <p className='small-regular'>({item.text.length} characters)</p>
    </div>
  );
};

export default Card;
