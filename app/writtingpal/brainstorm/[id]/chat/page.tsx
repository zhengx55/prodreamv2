'use client';
import { Button } from '@/components/ui/button';
import { useChatNavigatorContext } from '@/context/ChatNavigationProvider';
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
      className='flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center gap-y-28 overflow-y-auto'
    >
      <h1 className='h1-semibold mt-20 capitalize'>
        How would you like to start?
      </h1>
      <div className='relative flex items-center md:gap-x-20'>
        <div
          className={`${
            selected === 0 && 'border border-primary-200'
          } chat-mode`}
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
          <h1 className='h3-bold self-start'>Collaboration Mode</h1>
          <p className='base-light '>
            Start by brainstorming past experiences and write step by step!
          </p>
        </div>
        <div
          className={`${
            selected === 1 && 'border border-primary-200'
          } chat-mode`}
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

          <h1 className='h3-bold self-start'>Reference Mode</h1>
          <p className='base-light '>
            I already have a plan! Start by filling out information on my
            experiences and get sample essays!
          </p>
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
          className='absolute -bottom-20 right-0'
        >
          Next
        </Button>
      </div>
    </motion.main>
  );
}
