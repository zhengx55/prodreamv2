'use client';
import { fadeIn } from '@/constant/motion';
import { m } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const Swift = () => {
  const [selected, setSelected] = useState(0);
  return (
    <section className='relative flex w-full justify-center px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-10 sm:max-w-[1410px]'>
        <m.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='flex-col sm:flex-row flex items-center justify-evenly gap-y-4 sm:gap-y-0'
        >
          <m.div
            className='flex w-full flex-col gap-y-2 sm:w-1/2'
          >
            <h1 className='font-baskerville text-[28px] sm:text-[48px] font-[400] text-center sm:w-full sm:text-left'>Minutes <span className="before:block before:absolute before:top-[16px] sm:before:top-[36px] before:-inset-1 before:-skew-y-0 before:h-[40%] before:bg-[#CDCDFF] relative inline-block before:z-[-1]">to Perfection</span>: Swift and Flawless Editing!</h1>
            <p className='small-regular text-[#64626A] text-center sm:text-left'>
              Discover how our premier editing tools can transform your academic work into a masterpiece of clarity and precision.
            </p>
            <div
              className='block sm:hidden mt-[20px]'
            >
              <Image
                alt={''}
                src={selected === 0 ? '/landing/showcase/Evaluate.png' : selected === 1 ? '/landing/showcase/Polish.png' : '/landing/showcase/Team.png'}
                className='h-auto rounded-[8px] bg-[#F5F6F9] w-[600px] object-contain'
                width={700}
                height={500}
              />
            </div>
            <div className={`${selected === 0 ? 'border-b-2 border-[#9C2CF3]':''} cursor-pointer py-1`} onClick={()=>{setSelected(0)}}>
              <h5 className='sm:text-[24px] text-[16px] sm:font-[500] text-left sm:text-left'>Paraphrase Perfection</h5>
              <p className='small-regular text-[20px] text-[#64626A] text-left sm:text-left'>
                Refine and reword your content for clarity and originality, maintaining the essence of your ideas.
              </p>

            </div>
            <div className={`${selected === 1 ? 'border-b-2 border-[#9C2CF3]':''} cursor-pointer py-1`} onClick={()=>{setSelected(1)}}>
              <h5 className='sm:text-[24px] text-[16px] sm:font-[500] text-left sm:text-left'>Multi-language Support</h5>
              <p className='small-regular text-[#64626A] text-left sm:text-left'>
                Bridge the Gap: Effortlessly convert your work from any language into polished English.
              </p>
            </div>
            <div className={`${selected === 2 ? 'border-b-2 border-[#9C2CF3]':''} cursor-pointer py-1`} onClick={()=>{setSelected(2)}}>
              <h5 className='sm:text-[24px] text-[16px] sm:font-[500] text-left sm:text-left'>Academic Enhancer</h5>
              <p className='small-regular text-[#64626A] text-left sm:text-left'>
                Elevate your writing to scholarly standards for a polished, academic finish.
              </p>
            </div>
          </m.div>
          <m.div
            className='hidden sm:block'
          >
            <Image
              alt={''}
              src={selected === 0 ? '/landing/showcase/Evaluate.png' : selected === 1 ? '/landing/showcase/Polish.png' : '/landing/showcase/Team.png'}
              className='h-auto rounded-[8px] bg-[#F5F6F9] w-[600px] object-contain'
              width={700}
              height={500}
            />
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
export default Swift;
