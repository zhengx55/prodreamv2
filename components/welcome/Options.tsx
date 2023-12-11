'use client';
import { WelcomOptions } from '@/constant';
import Image from 'next/image';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Options = ({
  firstname,
  type,
}: {
  firstname: string;
  type?: 'onboard';
}) => {
  const [selected, setSelected] = useState<string>('/writtingpal/polish');
  return (
    <>
      <h1 className='h2-bold'>
        Welcome {type ? '' : 'back'}, {firstname}!{' '}
      </h1>
      <Spacer y='64' />
      <p className='h3-bold'>What would you like to work on today?</p>
      <Spacer y='24' />
      <div className='flex gap-x-4'>
        {WelcomOptions.map((item) => (
          <div
            onClick={() => setSelected(item.link)}
            className={` flex shrink-0 cursor-pointer flex-col justify-between gap-y-4 rounded-lg p-4 hover:brightness-110 ${
              item.link === selected
                ? ' border-[4px] border-primary-200 bg-transparent'
                : 'border border-welcome-border bg-welcome-background/40'
            }`}
            key={item.id}
          >
            <p className='base-semibold'>{item.title}</p>
            <Image
              alt={item.title}
              src={item.image}
              className='h-[160px] w-[250px] rounded-lg'
              width={1000}
              height={1000}
              priority
            />
          </div>
        ))}
      </div>
      <Spacer y='64' />
      <p className='title-regular'>
        Awesome! We are sure you will nail your college applications!
      </p>
      <Spacer y='64' />
      <div className='flex-between'>
        <Link
          href={type ? '/welcome/info' : '/login'}
          className={cn(buttonVariants({ variant: 'ghost' }), 'px-0')}
        >
          <ChevronLeft size={20} /> Back
        </Link>
        <Link
          href={selected}
          className={buttonVariants({ variant: 'default' })}
        >
          Next
        </Link>
      </div>
    </>
  );
};

export default Options;
