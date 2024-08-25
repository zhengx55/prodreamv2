'use client';
import { CommentsSliderInfo } from '@/constant/landing';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const rotationValues = [-26, -18, -6, 6, 18, 26];
const positions = [
  {
    top: '45%',
    left: '-15%',
  },
  {
    top: '20%',
    left: '6%',
  },
  {
    top: '7%',
    left: '28.5%',
  },
  {
    top: '7%',
    left: '51.5%',
  },
  {
    top: '20%',
    left: '74%',
  },
  {
    top: '45%',
    left: '95%',
  },
];

const Comments = () => {
  const [rotationSlides, setRotationSlides] = useState(CommentsSliderInfo);

  const handleNext = () => {
    setRotationSlides((prev) => {
      const newSlides = [...prev];
      const last = newSlides.pop() as (typeof prev)[0];
      newSlides.unshift(last);
      return newSlides;
    });
  };
  const handlePrev = () => {
    setRotationSlides((prev) => {
      const newSlides = [...prev];
      const first = newSlides.shift() as (typeof prev)[0];
      newSlides.push(first);
      return newSlides;
    });
  };
  return (
    <div className='relative flex-1 pt-20'>
      {rotationSlides.map((comment, index) => (
        <motion.div
          key={comment.name}
          className='absolute flex h-[325px] w-1/5 flex-col justify-between rounded-2xl border border-white bg-white/60 p-6'
          transition={{
            type: 'just',
          }}
          initial={{
            rotate: rotationValues[index],
            top: positions[index].top,
            left: positions[index].left,
          }}
          animate={{
            rotate: rotationValues[index],
            top: positions[index].top,
            left: positions[index].left,
          }}
        >
          <p className='text-sm font-medium text-black/50'>
            &quot;{comment.comment}&quot;
          </p>
          <Separator
            className='mb-2 mt-auto bg-black/10'
            orientation='horizontal'
          />
          <div className='flex items-center gap-x-4'>
            <Image
              alt={comment.name}
              src={comment.avatar}
              width={100}
              height={100}
              className='size-[60px]'
            />
            <div className='flex flex-col gap-y-1'>
              <p className='text-lg font-semibold'>{comment.name}</p>
              <p className='text-xs font-medium text-black/50'>
                {comment.role}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      <div className='absolute bottom-20 left-[calc(50%_-72px)] flex gap-x-16'>
        <Button onClick={handlePrev} className='rounded-full' size={'icon'}>
          <ArrowLeft size={20} />
        </Button>
        <Button onClick={handleNext} className='rounded-full' size={'icon'}>
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Comments;
