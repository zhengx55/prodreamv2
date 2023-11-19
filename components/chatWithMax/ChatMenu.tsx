import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {};

const ChatMenu = (props: Props) => {
  return (
    <>
      <div className='flex-center h-16 w-16 rounded-[47px] rounded-bl-none bg-primary-50'>
        <Image
          alt='max'
          src='/max.png'
          className='h-auto w-auto'
          width={26}
          height={34}
        />
      </div>
      <h1 className='h2-bold '>Hi, I&apos;m Max. How can I help you ?</h1>
      <p className='base-regular text-shadow-100'>
        Ask me questions on the following aspects
      </p>
      <div className='flex-between mt-12 w-[80%] cursor-pointer rounded-xl border border-shadow-border p-4 hover:bg-primary-50'>
        <div className='flex items-center gap-x-4'>
          <div className='flex-center h-14 w-14 rounded-xl bg-[#9068D033]'>
            <Image
              src={'/school-chat.svg'}
              width={32}
              height={32}
              alt='school-chat'
            />
          </div>
          <p className='title-semibold'> School selection</p>
        </div>
        <ArrowRight className='text-shadow-100' />
      </div>
      <div className='flex-between mt-2 w-[80%] cursor-pointer rounded-xl border border-shadow-border p-4 hover:bg-primary-50'>
        <div className='flex items-center gap-x-4'>
          <div className='flex-center h-14 w-14 rounded-xl bg-[#F6DACE]'>
            <Image
              src={'/colleage-chat.svg'}
              width={32}
              height={32}
              alt='college-chat'
            />
          </div>
          <p className='title-semibold'> College application</p>
        </div>
        <ArrowRight className='text-shadow-100' />
      </div>
    </>
  );
};

export default ChatMenu;
