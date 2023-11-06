'use client';

import { IBrainsotrmCard } from '@/types';
import { useRouter } from 'next/navigation';

type Props = {
  cardItem: IBrainsotrmCard;
};

const Card = ({ cardItem }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/writtingpal/brainstorm/${132}`)}
      className='flex h-[200px] w-[350px] shrink-0 cursor-pointer flex-col rounded-lg border-1 border-shadow-border bg-white hover:bg-hover-50 md:p-5'
    >
      <h1 className='title-semibold'>{cardItem.name}</h1>
      <p className='small-regular mt-2 text-shadow'>{cardItem.description}</p>
      <span className='flex-center small-regular mt-auto h-[30px] w-[65px] rounded-xl bg-primary-50 px-2 py-1 text-primary-200'>
        {cardItem.price} Point
      </span>
    </div>
  );
};

export default Card;
