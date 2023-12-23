'use client';
import { ShowCases } from '@/constant';
import { fadeIn } from '@/constant/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ShowCase = () => {
  return (
    <section className='relative flex w-full justify-center py-20'>
      <div className='flex-center w-full max-w-[1450px] flex-col gap-y-10'>
        {ShowCases.map((item, index) => (
          <motion.div
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            className={`${
              index === 1 && 'flex-row-reverse'
            } flex items-center justify-evenly`}
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
                width={1920}
                height={920}
              />
            </motion.div>

            <motion.div
              variants={
                index === 1
                  ? fadeIn('right', 'tween', 0.2, 1)
                  : fadeIn('left', 'tween', 0.2, 1)
              }
              className='flex w-1/3 flex-col gap-y-2'
            >
              <h1 className='h2-bold'>{item.title}</h1>
              <p className='small-regular'>{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default ShowCase;
