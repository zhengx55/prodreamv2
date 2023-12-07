'use client';
import React, { useState } from 'react';
import Spacer from '../root/Spacer';
import { ChevronRight, PenLine } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import PolishModal from './PolishModal';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';

const Rightbar = () => {
  return (
    <div className='absolute right-0 top-0 hidden h-full flex-col rounded-md border-l border-shadow-border bg-white px-4 md:flex md:w-[240px]'>
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>Essay Evaluation</h2>
      <Spacer y='12' />
      <div className='flex flex-col gap-y-4 rounded-xl bg-card p-4'>
        <Image
          alt='rated'
          src='/rated.png'
          className='self-center'
          width={54}
          height={54}
        />
        <Button variant={'white'} className='small-semibold justify-center'>
          Get Rated
        </Button>
      </div>
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>Check</h2>
      <Spacer y='12' />
      <Button
        variant={'ghost'}
        className='small-semibold border border-shadow-border'
      >
        Plagiarism Check
      </Button>
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>AI Polish</h2>
      <Spacer y='12' />
      <PolishModal />
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>Chat Edit</h2>
      <p className='small-regular text-shadow'>AI writing polish</p>
      <Spacer y='12' />
      <Button
        variant={'ghost'}
        className='small-semibold border border-shadow-border'
      >
        <PenLine size={20} />
        Highlight to polish
      </Button>
    </div>
  );
};

export default Rightbar;
