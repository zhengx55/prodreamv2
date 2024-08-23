'use client';

import { CommentsSliderInfo } from '@/constant/landing';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const rotationValues = [-26, -18, -6, 6, 18, 26];
const SLIDE_WIDTH = 325;

const Comments = () => {
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    if (currentIndex < CommentsSliderInfo.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <div
        role='carousel'
        aria-describedby='comments'
        className='relative flex flex-1 gap-x-16 pt-20 transition-transform duration-300'
        // style={{
        //   transform: `translateX(-${currentIndex * SLIDE_WIDTH}px)`,
        // }}
      >
        {CommentsSliderInfo.map((comment, comment_idx) => {
          const rotationIndex = visibleSlides.indexOf(comment_idx);
          return (
            <div
              key={comment.name}
              style={
                {
                  // rotate: `${rotationValues[rotationIndex] ?? 0}deg`,
                  // transition: 'rotate 0.3s ease-in-out',
                  // marginTop: `${comment_idx * 20}px`
                }
              }
              className='flex h-[325px] max-w-[325px] shrink-0 basis-[20%] -rotate-[18deg] flex-col rounded-2xl border border-white bg-white/60 p-6 transition-all duration-300 2xl:basis-[18%]'
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
                  width={60}
                  height={60}
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
          );
        })}
      </div>
      <div className='absolute bottom-20 left-[calc(50%_-72px)] flex gap-x-16'>
        <Button
          size={'icon'}
          className='rounded-full'
          onClick={handlePrevSlide}
        >
          <ArrowLeft size={20} />
        </Button>
        <Button
          size={'icon'}
          className='rounded-full'
          onClick={handleNextSlide}
        >
          <ArrowRight size={20} />
        </Button>
      </div>
    </>
  );
};

export default Comments;
