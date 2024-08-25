'use client';
import { AgentsInfo } from '@/constant/landing';
import Image from 'next/image';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

const Agents = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section
      className='relative flex flex-1 flex-col items-center'
      style={{
        background:
          'linear-gradient(180deg, #DAE3FA 0%, #F1F1FB 26.65%, #F6F7FB 51.29%, #F3F3FB 74.42%, rgba(215, 226, 249, 0) 100%)',
      }}
      datatype='agents'
      aria-label='agents'
    >
      <Spacer y='150' className='block 2xl:block' />
      <h2 className='text-center font-inter text-[40px] font-semibold leading-[48px]'>
        Powerful AI Agents
        <br /> Your Ultimate College&nbsp;
        <span className='text-violet-700'>Admissions Support</span>
      </h2>
      <Spacer y='24' className='block 2xl:block' />
      <div className='flex min-h-[700px] w-[85%] justify-between 2xl:w-[70%]'>
        <aside className='flex flex-col gap-y-10 self-center'>
          {AgentsInfo.map((agent, index) => {
            const isSelected = selected === index;
            return (
              <div
                key={agent.id}
                role='button'
                aria-label='agent-avatars'
                onClick={() => setSelected(index)}
                className={`${isSelected ? 'border-white shadow' : 'border-transparent bg-stone-300'} size-[100px] cursor-pointer overflow-hidden rounded-full border-[12px] transition-all hover:border-white`}
              >
                <Image
                  src={isSelected ? agent.avatar : agent.avatar_inactive}
                  alt={agent.name}
                  width={200}
                  height={200}
                  className='size-full'
                />
              </div>
            );
          })}
        </aside>
        <div className='relative flex flex-1'>
          <Image
            alt=''
            src='/landing/agents/background.png'
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            className='object-contain'
          />
          <div className='relative -top-12 left-2 flex-1 overflow-visible'>
            <Image
              src={AgentsInfo[selected].image}
              alt={AgentsInfo[selected].name}
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              className='object-contain'
            />
          </div>
        </div>
        <div className='flex max-w-[30%] flex-col gap-y-5 self-center'>
          <h3 className='text-[60px] font-black leading-none'>
            {AgentsInfo[selected].name}
          </h3>
          <p className='text-[32px] font-semibold leading-10'>
            {AgentsInfo[selected].role}
          </p>
          <article className='font-poppin text-base font-medium text-black/50'>
            {AgentsInfo[selected].description}
          </article>
          <Button variant={'landing'} className='self-end'>
            {AgentsInfo[selected].button_label}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Agents;
