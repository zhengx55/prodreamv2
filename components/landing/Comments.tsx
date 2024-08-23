'use client';
import { CommentsSliderInfo } from '@/constant/landing';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const rotationValues = [-26, -18, -6, 6, 18, 26];
const positions = [
  {
    top: '265px',
    left: '-19%',
  },
  {
    top: '115px',
    left: '3%',
  },
  {
    top: '50px',
    left: '27.5%',
  },
  {
    top: '50px',
    left: '52.5%',
  },
  {
    top: '115px',
    left: '77%',
  },
  {
    top: '265px',
    left: '99%',
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
        <div
          key={comment.name}
          className='absolute flex h-[325px] w-1/5 flex-col justify-between rounded-2xl border border-white bg-white/60 p-6 transition-all duration-300'
          style={{
            transform: `rotate(${rotationValues[index]}deg)`,
            top: positions[index].top,
            left: positions[index].left ?? '',
            transformOrigin: index <= 2 ? 'top right' : 'top left',
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
        </div>
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
