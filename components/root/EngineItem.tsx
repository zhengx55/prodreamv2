import Spacer from '@/components/root/Spacer';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Image from 'next/image';
import { FC, memo, useState } from 'react';

interface EngineItemProps {
  item: {
    id: string;
    image: string;
    name: string;
    intro: string;
    background: string;
    skills: string[];
    personalities: string[];
  };
}

const EngineItem: FC<EngineItemProps> = ({ item }) => {
  const [isHovering, setisHovering] = useState(false);

  return (
    <HoverCard
      open={isHovering}
      openDelay={50}
      closeDelay={50}
      onOpenChange={setisHovering}
      key={item.id}
    >
      <HoverCardTrigger asChild>
        <div
          className={`${isHovering ? 'bg-indigo-500' : 'bg-white/60'} flex cursor-pointer items-center gap-x-2 rounded-lg p-2 transition-all duration-200`}
        >
          <Image
            src={item.image}
            alt={item.name}
            width={40}
            height={40}
            className='h-auto w-10'
          />
          <h2
            className={`text-base transition-all duration-200 ${isHovering ? 'text-white' : 'text-zinc-600'}`}
          >
            {item.name}
          </h2>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side='right'
        align='start'
        className='flex w-[357px] flex-col rounded-lg border border-white p-2'
        style={{
          background: 'rgba(255, 255, 255, 0.10)',
          backdropFilter: 'blur(8px)',
          boxShadow:
            '0px 4px 8px -1px rgba(87, 84, 94, 0.13), 0px 7px 12px 2px rgba(87, 84, 94, 0.09)',
        }}
      >
        <div className='rounded-lg bg-white p-2'>
          <div className='flex items-center gap-x-4'>
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className='h-auto w-14'
            />
            <div className='flex flex-col gap-y-1'>
              <h2 className='text-lg font-medium text-zinc-800'>{item.name}</h2>
              <p className='text-xs leading-tight text-zinc-600'>
                {item.intro}
              </p>
            </div>
          </div>
          <Spacer y='16' />
          <h2 className='text-sm font-medium text-zinc-800'>Background</h2>
          <Spacer y='4' />
          <p className='text-xs leading-tight text-zinc-600'>
            {item.background}
          </p>
          <Spacer y='16' />
          <h2 className='text-sm font-medium text-zinc-800'>Skills</h2>
          <Spacer y='4' />
          <ul className='flex flex-wrap gap-x-2 gap-y-1'>
            {item.skills.map((skill) => (
              <li
                key={skill}
                className='rounded bg-white px-2 py-1 text-xs leading-tight text-violet-600'
              >
                {skill}
              </li>
            ))}
          </ul>
          <Spacer y='16' />
          <h2 className='text-sm font-medium text-zinc-800'>Personalities</h2>
          <Spacer y='4' />
          <ul className='flex flex-wrap gap-x-2 gap-y-1'>
            {item.personalities.map((personality) => (
              <li
                key={personality}
                className='rounded-full bg-white px-2 py-1 text-xs leading-tight text-indigo-500'
              >
                {personality}
              </li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default memo(EngineItem);
