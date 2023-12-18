'use client';
import { IBrainsotrmCard } from '@/types';
import { Variants, motion } from 'framer-motion';
import { ChevronRight, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Separator } from '../ui/separator';
import Card from './Card';

type Props = {
  title: string;
  cardList: Array<IBrainsotrmCard>;
};
const List = ({ title, cardList }: Props) => {
  const [isExpended, setIsExpended] = useState(false);
  const togglePanel = () => {
    setIsExpended(!isExpended);
  };

  const ListVariant: Variants = {
    open: { height: 'auto' },
    closed: { height: '276px' },
  };

  return (
    <motion.div
      className='flex shrink-0 flex-col overflow-hidden rounded-md bg-white'
      variants={ListVariant}
      initial={false}
      animate={isExpended ? 'open' : 'closed'}
    >
      <div className='flex-between h-14 shrink-0 px-5'>
        <div className='flex items-center gap-x-2'>
          <div className='flex-center h-9 w-9 rounded-full bg-primary-200'>
            <Image
              alt='telegram'
              src='/telegram.svg'
              width={24}
              height={24}
              priority
            />
          </div>
          <h1 className='title-semibold text-black-200'>{title}</h1>
        </div>
        <div className='flex cursor-pointer gap-x-2' onClick={togglePanel}>
          {isExpended ? (
            <>
              <p className='body-normal text-primary-200'>Collapse</p>
              <ChevronUp className='text-primary-200' />
            </>
          ) : (
            <>
              <p className='body-normal text-primary-200'>Expand</p>
              <ChevronRight className='text-primary-200' />
            </>
          )}
        </div>
      </div>

      <Separator className='bg-shadow-border' />
      <div
        className={`flex gap-5 overflow-x-auto px-5 py-5 ${
          isExpended ? 'flex-wrap' : 'flex-nowrap'
        }`}
      >
        {cardList.map((item) => {
          return <Card key={item.id} cardItem={item} />;
        })}
      </div>
    </motion.div>
  );
};

export default List;
