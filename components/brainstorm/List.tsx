'use client';
import { Variants, motion } from 'framer-motion';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { ChevronRight, ChevronUp } from 'lucide-react';
import Card from './Card';

type Props = {};
const List = (props: Props) => {
  const [isExpended, setIsExpended] = useState(false);
  const togglePanel = () => {
    setIsExpended(!isExpended);
  };

  const ListVariant: Variants = {
    open: { height: 'auto' },
    closed: { height: '297px' },
  };

  return (
    <motion.div
      className='flex h-[300px] shrink-0 flex-col overflow-hidden rounded-md bg-white'
      variants={ListVariant}
      initial={false}
      animate={isExpended ? 'open' : 'closed'}
    >
      <div className='flex-between h-14 shrink-0 px-4'>
        <h1 className='title-semibold text-black-200'>blablabla</h1>
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
        className={`flex gap-5 overflow-x-auto px-4 py-5 ${
          isExpended ? 'flex-wrap' : 'flex-nowrap'
        }`}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> <Card />
        <Card />
        <Card /> <Card />
        <Card />
        <Card />
      </div>
    </motion.div>
  );
};

export default List;
