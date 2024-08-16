'use client';
import Icon from '@/components/root/Icon';
import NavItem from '@/components/root/NavItem';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  workbench_engine,
  workbench_nav,
  workbench_profile,
} from '@/constant/workbench_constant';
import { useUserSession } from '@/query/session';
import { LoginData } from '@/query/type';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { FC, memo, useMemo, useState } from 'react';

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

interface UserProfileItemProps {
  user: LoginData;
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
            className='size-10'
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

const UserProfileItem: FC<UserProfileItemProps> = ({ user }) => {
  const renderedProfileItems = useMemo(
    () =>
      workbench_profile.map((item) => (
        <NavItem key={item.id} item={item} href={item.link} />
      )),
    []
  );

  return (
    <Popover>
      <PopoverTrigger>
        <li className='group inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white hover:bg-[#6866E2] hover:text-white hover:shadow'>
          {user.avatar ? (
            <Icon
              src={user.avatar}
              alt={user.first_name}
              width={25}
              height={25}
              className='size-6 rounded-full'
              priority
            />
          ) : (
            <Skeleton className='size-6 rounded-full' />
          )}
          <p className='text-zinc-600 group-hover:text-white'>
            {user.first_name}
          </p>
          <ChevronRight className='ml-auto' size={16} />
        </li>
      </PopoverTrigger>
      <PopoverContent
        className='custom-popover-content w-[180px] p-2'
        side='right'
        align='end'
      >
        <div className='flex flex-col gap-y-2'>{renderedProfileItems}</div>
      </PopoverContent>
    </Popover>
  );
};

const LeftTopMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: user, isPending, isError } = useUserSession();

  const renderedEngineItems = useMemo(
    () =>
      workbench_engine.map((item) => <EngineItem key={item.id} item={item} />),
    []
  );

  const renderedNavItems = useMemo(
    () =>
      workbench_nav.map((item) => (
        <NavItem key={item.id} item={item} href={item.link} />
      )),
    []
  );

  const showMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='flex items-center justify-center gap-x-2'>
      <div className='flex h-7 cursor-pointer items-center justify-center rounded-lg px-2 transition-all duration-200 hover:bg-white hover:bg-opacity-60'>
        <Image
          src='/logo/Prodream.png'
          alt='Logo'
          width={130}
          height={20}
          priority
          className='h-5 w-[130px]'
        />
      </div>
      <Separator className='h-5 bg-zinc-400' orientation='vertical' />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            role='button'
            variant={'icon'}
            onClick={showMenu}
            className='p-0.5'
          >
            <Image
              src='/workbench/menu_icon.svg'
              alt='Menu Icon'
              width={24}
              height={24}
              className='size-6'
              priority
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='custom-popover-content flex h-[calc(100vh_-3rem)] w-[220px] flex-col justify-between backdrop-blur-lg backdrop-filter'
          side='bottom'
          align='end'
        >
          <div className='flex flex-col gap-y-2'>{renderedEngineItems}</div>
          <ul className='mt-auto flex flex-col gap-y-2'>
            {renderedNavItems}
            <Separator className='bg-zinc-500' orientation='horizontal' />
            {isPending || isError ? null : <UserProfileItem user={user} />}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default memo(LeftTopMenu);
