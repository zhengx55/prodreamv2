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
      onClick={() => {
        // !TEST
        if (cardItem.id === '820e6ec3bb1648958140ffac066836e9') {
          router.push(`/writtingpal/brainstorm/${cardItem.id}/chat`);
        } else {
          router.push(`/writtingpal/brainstorm/${cardItem.id}`);
        }
      }}
      className='flex h-[200px] w-[350px] shrink-0 cursor-pointer flex-col rounded-lg border border-shadow-border bg-white hover:bg-hover-50 md:p-5'
    >
      <h1 className='title-medium'>{cardItem.name}</h1>
      <p className='small-regular mt-2 line-clamp-2 text-shadow'>
        {cardItem.description}
      </p>
      <span className='flex-center small-regular mt-auto h-[30px] w-[65px] rounded-xl bg-primary-50 px-2 py-1 text-primary-200'>
        {cardItem.price} Point
      </span>
    </div>
  );
};

export default Card;
