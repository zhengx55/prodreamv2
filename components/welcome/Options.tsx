'use client';
import { WelcomOptions } from '@/constant';
import Image from 'next/image';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const Options = ({
  firstname,
  type,
}: {
  firstname: string;
  type?: 'onboard';
}) => {
  const datalist = [
    { name: 'English native speaker', src: '/welcome/wel4.png' },
    { name: 'International Student', src: '/welcome/wel5.png' },
  ];
  return (
    <div className='h-max w-full'>
      <h1 className='text-center text-[48px] font-[600] text-[#17161B]'>
        Welcome to ProDream
      </h1>
      <p className='text-center text-[24px] font-[400] text-[#525252]'>
        Personalize your writing experience. Write faster and better than ever.
      </p>
      <div className='mt-[98px] flex w-full gap-x-[40px]'>
        {datalist.map((item, index) => (
          <Link href={'/writtingpal/polish'} className='w-full' key={item.name}>
            <div className='h-[500px] w-[500px] cursor-pointer rounded-[22px] border-[2px] border-[#D4D3D8] px-[20px] py-[36px]'>
              <h5 className='text-center text-[32px] font-[500] text-[#3B3A40]'>
                {item.name}
              </h5>
              <Spacer y='37' />
              <Image
                src={item.src}
                alt='welcome'
                width={460}
                height={320}
                className='h-auto w-[460px]'
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Options;
