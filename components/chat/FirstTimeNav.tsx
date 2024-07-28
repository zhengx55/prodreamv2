'use client';
import { useState } from 'react';
import Image from 'next/image';

const ServiceCard = ({
  iconSrc,
  iconAlt,
  title,
  description,
}: {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}) => {
  return (
    <div className='flex flex-col rounded-lg border border-[#DFE2EA] bg-white p-4'>
      <div className='mb-1 flex items-center gap-2'>
        <Image
          className='h-6 w-6'
          src={iconSrc}
          alt={iconAlt}
          width={24}
          height={24}
        />
        <h3 className='font-poppins text-base font-medium leading-7 text-[#272330]'>
          {title}
        </h3>
      </div>
      <p className='font-poppins text-xs font-normal leading-5 text-[#57545E]'>
        {description}
      </p>
    </div>
  );
};

const ServiceGrid = () => {
  return (
    <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-3'>
      <ServiceCard
        iconSrc='/workbench/nav_brainstorming.svg'
        iconAlt='Brainstorming Icon'
        title='Brainstorming'
        description='Uncover your most compelling stories, experiences, and strengths'
      />
      <ServiceCard
        iconSrc='/workbench/nav_outline.svg'
        iconAlt='Outline Icon'
        title='Outline'
        description='Create a structured roadmap for your essay'
      />
      <ServiceCard
        iconSrc='/workbench/nav_draftproofread.svg'
        iconAlt='Draft & Proofread Icon'
        title='Draft & Proofread'
        description='Write, review, and refine your essay to perfection'
      />
    </div>
  );
};

const FirstTimeNav = () => {
  return (
    <div className='bg-card flex flex-col items-center p-6'>
      <Image
        className='w-22 h-22 mb-4 rounded-full'
        src='/workbench/max.png'
        alt='User Avatar'
        width={88}
        height={88}
      />
      <h2 className='mb-2 font-poppins text-[20px] font-medium leading-8 text-[#57545E]'>
        Max
      </h2>
      <p className='mb-6 max-w-md text-center font-poppins text-sm font-normal leading-6 text-[#57545E]'>
        Hello, I&apos;m Max. I specialize in helping students craft compelling
        application essays for college admissions. Let me understand what
        you&apos;re working on.
      </p>
      <ServiceGrid />
    </div>
  );
};

export default FirstTimeNav;
