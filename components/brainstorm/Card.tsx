'use client';

import { useRouter } from 'next/navigation';

type Props = {};

const Card = (props: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/writtingpal/brainstorm/${132}`)}
      className='flex shrink-0 cursor-pointer flex-col rounded-lg border-1 border-shadow-border bg-white hover:bg-hover-50 md:h-[200px] md:w-[350px] md:p-5'
    >
      hello
    </div>
  );
};

export default Card;
