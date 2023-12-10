'use client';
import React from 'react';
import Spacer from '../root/Spacer';
import { PenLine } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useAiEditiorContext } from '@/context/AIEditiorProvider';
import dynamic from 'next/dynamic';

const ReportSheet = dynamic(() => import('./ReportSheet'), { ssr: false });
const PolishModal = dynamic(() => import('./PolishModal'), { ssr: false });
const Rightbar = () => {
  return (
    <div className='absolute right-0 top-0 hidden h-full flex-col rounded-md border-l border-shadow-border bg-white px-4 md:flex md:w-[240px]'>
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>Essay Evaluation</h2>
      <Spacer y='12' />
      <ReportSheet />
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
      <Spacer y='24' />
      <Separator orientation='horizontal' className='bg-shadow-border' />
      <Spacer y='24' />
      <h2 className='title-semibold text-black-100'>AI Polish</h2>
      <Spacer y='12' />
      <PolishModal />
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
    </div>
  );
};

export default Rightbar;
