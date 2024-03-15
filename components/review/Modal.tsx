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
        className='md:w-[800px] md:gap-y-0 md:rounded-xl md:p-6'
      >
        <DialogHeader>
          <DialogClose className='self-end'>
            <XCircle className='text-stone-300' />
          </DialogClose>
        </DialogHeader>
        <Spacer y='24' />
        <div className='flex-between'>
          <Link
            passHref
            href={'https://tally.so/r/wAdBro'}
            target='_blank'
            className='w-[48%]'
          >
            <div className='inline-flex h-[305px] w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border border-zinc-300 bg-white p-6 hover:bg-slate-50'>
              <h3 className='text-center text-2xl font-medium leading-10 text-zinc-800'>
                Direct Submission
              </h3>
              <Image
                alt='submission'
                src='/review/Submission.png'
                width={162}
                height={162}
              />
              <p className='h-[55px] w-[321px] text-center text-base font-light leading-7 text-zinc-600'>
                Provide your essay details for quick access to professional
                review.
              </p>
            </div>
          </Link>
          <Link
            passHref
            href={'https://tally.so/r/wAdBro'}
            target='_blank'
            className='w-[48%]'
          >
            <div className='inline-flex h-[305px] w-full cursor-pointer flex-col items-center justify-center  gap-2.5 rounded-lg border border-zinc-300 bg-white p-6 hover:bg-slate-50'>
              <h3 className='text-center text-2xl font-medium leading-10 text-zinc-800'>
                Free Review
              </h3>
              <Image
                alt='free'
                src='/review/free.png'
                width={162}
                height={162}
              />

              <p className='h-[55px] w-[321px] text-center text-base font-light leading-7 text-zinc-600'>
                Fill out a brief feedback questionnaire and get a free
                first-time essay review.
              </p>
            </div>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default memo(Modal);
