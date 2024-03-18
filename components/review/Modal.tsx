'use client';
import { XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, memo } from 'react';
import Spacer from '../root/Spacer';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[540px] md:gap-y-0 md:rounded-xl md:p-6'
      >
        <DialogHeader>
          <DialogClose className='self-end'>
            <XCircle className='text-stone-300' />
          </DialogClose>
        </DialogHeader>
        <Spacer y='10' />
        <div className='flex flex-col'>
          <Link
            passHref
            href={'https://tally.so/r/3lyyev'}
            target='_blank'
            className='w-full'
          >
            <div className='flex h-[200px] w-full cursor-pointer items-center gap-x-6 rounded-lg border border-zinc-300 bg-white p-4 hover:bg-slate-50'>
              <Image
                alt='submission'
                src='/review/Free.png'
                width={140}
                height={140}
                className='size-[140px]'
              />
              <div className='flex flex-col items-start gap-y-2'>
                <h3 className='text-center text-base font-medium leading-10 text-zinc-800'>
                  Claim Free Review &nbsp;&nbsp;
                  <span className='subtle-regular inline-flex h-5 w-10 items-center justify-center rounded-sm bg-amber-500 text-white'>
                    FREE
                  </span>
                </h3>
                <p className='text-sm font-light text-zinc-600'>
                  Fill out a brief feedback questionnaire and get a free
                  first-time essay review.
                </p>
              </div>
            </div>
          </Link>
          <Spacer y='14' />

          <div className='flex h-[200px] w-full flex-col gap-y-4 rounded-lg border border-zinc-300 bg-white p-6'>
            <h3 className='text-left text-base font-medium leading-10 text-zinc-800'>
              Don&apos;t want to do the questionnaire?
            </h3>
            <p className='text-left text-sm font-light leading-7 text-zinc-600'>
              Provide some basic information on your writing and we will contact
              to discuss additional requirements and pricing.&nbsp;
              <Link
                target='_blank'
                href={'https://tally.so/r/wAdBro'}
                className='cursor-pointer underline'
              >
                Get your essay reviewed now.
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default memo(Modal);
