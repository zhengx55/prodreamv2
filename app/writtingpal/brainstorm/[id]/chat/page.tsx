'use client';
import { Button } from '@/components/ui/button';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const { updateCurrentRoute } = useChatNavigatorContext();

  const [selected, setSelected] = useState(0);
  const router = useRouter();
  return (
    <motion.main
      key={'startup'}
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto md:px-0'
    >
      <div className='flex flex-col md:gap-y-20'>
        <h1 className='h3-semibold mt-20 self-start capitalize'>
          How would you like to start?
        </h1>
        <div className='flex md:gap-x-20'>
          <div
            className={`${
              selected === 0 && 'border border-primary-200 bg-primary-50'
            } chat-mode bg-hover-100`}
            onClick={() => setSelected(0)}
          >
            <div className='relative md:h-[10rem] md:w-[8.25rem]'>
              <Image
                alt='collaboration-mode'
                src='/comode.png'
                className='w-auto object-contain'
                sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                fill
                priority
              />
            </div>
            <h1 className='h3-bold self-center'>Collaboration Mode</h1>
            <p className='base-light self-center'>
              Start by brainstorming past experiences and write step by step!
            </p>
          </div>
          <div
            className={`${
              selected === 1 && 'border border-primary-200 bg-primary-50'
            } chat-mode bg-hover-100`}
            onClick={() => setSelected(1)}
          >
            <div className='relative md:h-[10rem] md:w-[8.25rem]'>
              <Image
                alt='collaboration-mode'
                src='/refmode.png'
                className='w-auto object-contain'
                fill
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
              />
            </div>

            <h1 className='h3-bold self-center'>Reference Mode</h1>
            <p className='base-light self-center'>
              I already have a plan! Start by filling out information on my
              experiences and get sample essays!
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            if (selected === 0) {
              updateCurrentRoute('informations');
            } else {
              router.push(`/writtingpal/brainstorm/${params.id}`);
            }
          }}
          size={'expand'}
          className='self-end'
        >
          Next
        </Button>
      </div>
    </motion.main>
  );
}
