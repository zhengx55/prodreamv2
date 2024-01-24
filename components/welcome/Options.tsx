'use client';
import { WelcomOptions } from '@/constant';
import Image from 'next/image';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Options = ({
  firstname,
  type,
}: {
  firstname: string;
  type?: 'onboard';
}) => {
  const datalist = [
    {name: 'English native speaker', src: '/welcome/wel4.png'},
    {name: 'International Student',  src: '/welcome/wel5.png'}
  ]
  return (
    <div className='h-max w-full'>
        <h1 className='text-[48px] font-[600] text-[#17161B] text-center'>Welcome to ProDream</h1>
        <p className='text-[#525252] text-[24px] font-[400] text-center'>Personalize your writing experience. Write faster and better than ever.</p>
        <div className='flex mt-[98px] gap-x-[40px] w-full'>
          {datalist.map((item,index)=>(
            <Link
              href={'/writtingpal/polish'}
              className='w-full'
            >
              <div className='w-[500px] h-[500px] rounded-[22px] border-[#D4D3D8] border-[2px] px-[20px] py-[36px] cursor-pointer' key={item.name}>
                <h5 className='text-[#3B3A40] text-[32px] font-[500] text-center'>{item.name}</h5>
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
