'use client';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const Swift = () => {
  const [selected, setSelected] = useState(1);
  return (
    <section className='relative flex w-full justify-center px-4 py-20 sm:px-0'>
      <div className='flex-center w-full flex-col gap-y-10 sm:max-w-[1200px]'>
        <m.div
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.25 }}
          className='flex flex-col items-center justify-evenly gap-y-4 sm:flex-row sm:gap-x-[60px] sm:gap-y-0'
        >
          <m.div className='flex w-full flex-col gap-y-2 sm:w-1/2'>
            <h1 className='text-center  text-[28px] font-[400] leading-[32px] sm:w-full sm:text-left sm:text-[48px] sm:leading-[58px]'>
              Minutes to <br className='hidden sm:block' />
              <span className='relative inline-block before:absolute before:-inset-1 before:top-[16px] before:z-[-1] before:block before:h-[40%] before:-skew-y-0 before:bg-[#CDCDFF] sm:before:top-[36px]'>
                {' '}
                Perfection
              </span>
              : Swift and Flawless Editing!
            </h1>
            <p className='small-regular text-center text-[#64626A] sm:text-left sm:text-[18px]'>
              Discover how our premier editing tools can transform your academic
              work into a masterpiece of clarity and precision.
            </p>
            <div className='mt-[20px] block sm:hidden'>
              <Image
                alt={''}
                src={
                  selected === 0
                    ? '/landing/showcase/Group4.svg'
                    : selected === 1
                      ? '/landing/showcase/Group5.svg'
                      : '/landing/showcase/Group6.svg'
                }
                className='h-auto w-[600px] rounded-xl bg-[#F5F6F9] object-contain'
                width={600}
                height={720}
              />
            </div>

            <div
              className={`${selected === 1 ? 'border-b-2 border-[#8551F3]' : ''} cursor-pointer py-1 pt-[74px]`}
              onClick={() => {
                setSelected(1);
              }}
            >
              <h5 className='text-left text-[16px] sm:text-left sm:text-[20px] sm:font-[500]'>
                Multi-language Support
              </h5>
              <p className='small-regular text-left text-[#64626A] sm:text-left sm:text-[18px]'>
                Bridge the Gap: Effortlessly convert your work from any language
                into polished English.
              </p>
            </div>
            <div
              className={`${selected === 0 ? 'border-b-2 border-[#8551F3]' : ''} cursor-pointer py-1`}
              onClick={() => {
                setSelected(0);
              }}
            >
              <h5 className='text-left text-[16px] sm:text-left sm:text-[20px] sm:font-[500]'>
                Paraphrase Perfection
              </h5>
              <p className='small-regular text-left text-[20px] text-[#64626A] sm:text-left sm:text-[18px]'>
                Refine and reword your content for clarity and originality,
                maintaining the essence of your ideas.
              </p>
            </div>
            <div
              className={`${selected === 2 ? 'border-b-2 border-[#8551F3]' : ''} cursor-pointer py-1`}
              onClick={() => {
                setSelected(2);
              }}
            >
              <h5 className='text-left text-[16px] sm:text-left sm:text-[20px] sm:font-[500]'>
                Academic Enhancer
              </h5>
              <p className='small-regular text-left text-[#64626A] sm:text-left sm:text-[18px]'>
                Elevate your writing to scholarly standards for a polished,
                academic finish.
              </p>
            </div>
          </m.div>
          <m.div className='hidden sm:block'>
            <Image
              alt={''}
              src={
                selected === 0
                  ? '/landing/showcase/Group4.svg'
                  : selected === 1
                    ? '/landing/showcase/Group5.svg'
                    : '/landing/showcase/Group6.svg'
              }
              className='h-[600px] w-full rounded-xl object-contain'
              width={600}
              height={720}
            />
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
export default Swift;
