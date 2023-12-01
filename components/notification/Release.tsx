import { release_data } from '@/constant';
import { AnimatePresence, Variants, motion, wrap } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {};
const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 630 : -630,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 630 : -630,
      opacity: 0,
    };
  },
};

const Release = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    if (currentIndex === 0) {
      setCurrentIndex(release_data.length - 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    setDirection(1);
    if (currentIndex + 1 === release_data.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  return (
    <motion.section
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key={'release-panel'}
      className='relative flex shrink-0 flex-col py-4'
    >
      <div
        onClick={handlePrev}
        className='first-letter: absolute -left-3 top-20 z-10 cursor-pointer rounded-full bg-white p-1 shadow-panel transition-transform hover:scale-105'
      >
        <ChevronLeft size={18} />
      </div>
      <div
        onClick={handleNext}
        className='first-letter: absolute -right-3 top-20 z-10 cursor-pointer rounded-full bg-white p-1 shadow-panel transition-transform hover:scale-105'
      >
        <ChevronRight size={18} />
      </div>
      <AnimatePresence initial={false} custom={direction} mode='popLayout'>
        <motion.div
          initial='enter'
          animate='center'
          exit='exit'
          variants={variants}
          custom={direction}
          transition={{
            x: { duration: 0.3 },
            opacity: { duration: 0.2 },
          }}
          key={release_data[currentIndex].id}
          className='flex shrink-0 flex-col gap-y-3'
        >
          <div className='flex-center h-40 w-full rounded-lg bg-primary-50'>
            <Image
              alt={release_data[currentIndex].title}
              src={release_data[currentIndex].img}
              width={220}
              height={210}
              className='pointer-events-none h-auto w-[250px]'
            />
          </div>
          <h2 className='base-semibold'>{release_data[currentIndex].title}</h2>
          <p className='small-regular text-shadow-100'>
            {release_data[currentIndex].description}
          </p>
          {currentIndex === 0 && <Button className='w-1/3'>Try it now!</Button>}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};

export default Release;
