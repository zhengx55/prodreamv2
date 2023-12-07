import React from 'react';
import Spacer from './Spacer';
import { ChevronRight, PenLine } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Image from 'next/image';

const Rightbar = () => {
  return (
    <div className='absolute right-0 top-0 hidden h-full flex-col rounded-md bg-white px-4 md:flex md:w-[240px]'>
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
      <div className='flex flex-col gap-y-2 rounded-lg border border-shadow-border p-2'>
        <div className='flex shrink-0 flex-col rounded-lg bg-nav-selected p-2'>
          <h1 className='small-semibold'>Polishing Settings</h1>
          <p className='small-regular text-shadow'>Sentence by Sentence</p>
        </div>
        <div className='flex shrink-0 flex-col rounded-lg bg-nav-selected p-2'>
          <h1 className='small-semibold'>Domain</h1>
          <p className='small-regular text-shadow'>Personal statement</p>
        </div>
        <div className='flex-between cursor-pointer p-2'>
          <p className='subtle-regular'>Adjust settings</p>
          <ChevronRight size={14} className='text-shadow' />
        </div>
      </div>
      <Spacer y='20' />
      <div className='flex gap-x-2'>
        <Button className='w-1/2'>Reset</Button>
        <Button className='w-1/2'>Polish</Button>
      </div>
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
