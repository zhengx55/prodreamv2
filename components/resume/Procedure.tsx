'use client';
import { ResumeProcedure } from '@/constant';
import React from 'react';
import Draggable from 'react-draggable';

const Procedure = () => {
  return (
    <Draggable bounds='parent'>
      <div className='absolute right-4 z-50 flex flex-col rounded-xl bg-white px-6 md:h-[433px] md:w-[380px]'>
        <h1 className='h3-bold mt-5 text-black-500'>
          Build a standout college resume the easy way
        </h1>
        <div className='relative mt-5 flex h-[280px] flex-col justify-between'>
          <span className='absolute left-4 top-2 z-10 h-[270px] w-[1px] border-1 border-dashed border-shadow-border' />

          {ResumeProcedure.map((item, index) => {
            return (
              <div
                key={`${index}-procedure`}
                className='flex items-center gap-x-4'
              >
                <span className='flex-center z-20 h-8 w-8 shrink-0 rounded-full border-1 border-primary-200 bg-white text-justify text-primary-200'>
                  {index}
                </span>
                <p className='base-medium break-keep text-black-500'>
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Draggable>
  );
};

export default Procedure;
