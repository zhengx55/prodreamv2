'use client';
import { ShowCases } from '@/constant';
import { fadeIn } from '@/constant/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ShowCase = () => {
  return (
    <section className='relative flex w-full justify-center px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-10 sm:max-w-[1450px]'>
        {ShowCases.map((item, index) => (
          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            className={`${
              index === 1
                ? 'flex-col sm:flex-row-reverse'
                : 'flex-col sm:flex-row'
            } flex items-center justify-evenly gap-y-4 sm:gap-y-0`}
            key={item.id}
          >
            <motion.div
              variants={
                index === 1
                  ? fadeIn('left', 'tween', 0.2, 1)
                  : fadeIn('right', 'tween', 0.2, 1)
              }
            >
              <Image
                alt={item.title}
                src={item.image}
                className='h-auto w-[600px] object-contain'
                width={600}
                height={400}
              />
            </motion.div>

            <motion.div
              variants={
                index === 1
                  ? fadeIn('right', 'tween', 0.2, 1)
                  : fadeIn('left', 'tween', 0.2, 1)
              }
              className='flex w-full flex-col gap-y-2 sm:w-1/3'
            >
              <h1 className='h2-bold text-center sm:text-left'>{item.title}</h1>
              <p className='small-regular text-center sm:text-left'>
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default ShowCase;
