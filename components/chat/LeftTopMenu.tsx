'use client';
import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';
import Tooltip from '@/components/root/Tooltip';
import {
  workbench_engine,
  workbench_nav,
  workbench_profile,
} from '@/constant/workbench_constant';
import { useUserInfo } from '@/zustand/store';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FC, memo, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

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

interface NavItemProps {
  item: {
    [x: string]: string;
    id: string;
    icon: string;
    title: string;
  };
}

interface UserProfileItemProps {
  user: {
    avatar?: string;
    first_name: string;
  };
}

const EngineItem: FC<EngineItemProps> = ({ item }) => {
  const [isHovering, setisHovering] = useState(false);

  return (
    <Popover open={isHovering} onOpenChange={setisHovering} key={item.id}>
      <PopoverTrigger onClickCapture={(e) => e.preventDefault()} asChild>
        <div
          onMouseEnter={() => setisHovering(true)}
          onMouseLeave={() => setisHovering(false)}
          className='group flex cursor-pointer flex-col items-start gap-2.5 rounded-lg bg-white/60 p-2 transition-all duration-200 hover:bg-[#6866E2]'
        >
          <div className='flex w-full items-center gap-2'>
            <div className='relative h-10 w-[35.714px]'>
              <Image
                src={item.image}
                alt={item.name}
                layout='fill'
                objectFit='cover'
                className='transition-all duration-200'
              />
            </div>
            <h2 className='flex-1 truncate font-poppins text-base font-normal leading-7 text-[#57545E] transition-all duration-200 group-hover:text-white'>
              {item.name}
            </h2>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side='right'
        align='start'
        className='flex w-[357px] flex-col rounded-lg border border-white bg-white/60 px-4 py-4 shadow backdrop-blur-lg backdrop-filter'
      >
        <div className='flex items-center gap-x-4 rounded-lg bg-white p-2'>
          <Image
            src={item.image}
            alt={item.name}
            width={60}
            height={60}
            className='h-auto w-14'
          />
          <div className='flex flex-col gap-y-1'>
            <h2 className='text-lg font-medium text-zinc-800'>{item.name}</h2>
            <p className='text-xs leading-tight text-zinc-600'>{item.intro}</p>
          </div>
        </div>
        <Spacer y='16' />
        <h2 className='text-sm font-medium text-zinc-800'>Background</h2>
        <Spacer y='4' />
        <p className='text-xs leading-tight text-zinc-600'>{item.background}</p>
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
      </PopoverContent>
    </Popover>
  );
};

const NavItem: FC<NavItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      key={item.id}
      className='group inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white hover:bg-[#6866E2] hover:shadow'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={isHovered ? item.icon_white : item.icon}
        alt={item.title}
        width={25}
        height={25}
        className='h-auto w-5 transition-all duration-200'
        priority
      />
      <p className='text-zinc-600 transition-all duration-200 group-hover:text-white'>
        {item.title}
      </p>
    </li>
  );
};

const UserProfileItem: FC<UserProfileItemProps> = ({ user }) => {
  const router = useRouter();
  const renderedProfileItems = useMemo(
    () =>
      workbench_profile.map((item) => <NavItem key={item.id} item={item} />),
    []
  );

  return (
    <Popover>
      <PopoverTrigger>
        <li className='group inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white  hover:bg-[#6866E2] hover:text-white hover:shadow'>
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
        className='custom-popover-content w-[180px] backdrop-blur-lg backdrop-filter hover:bg-white hover:bg-opacity-60'
        side='right'
        align='end'
      >
        <div className='flex flex-col gap-y-2'>{renderedProfileItems}</div>
      </PopoverContent>
    </Popover>
  );
};

const LeftTopMenu = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const user = useUserInfo((state) => state.user);

  const renderedEngineItems = useMemo(
    () =>
      workbench_engine.map((item) => <EngineItem key={item.id} item={item} />),
    []
  );

  const renderedNavItems = useMemo(
    () => workbench_nav.map((item) => <NavItem key={item.id} item={item} />),
    []
  );
  const toProfile = () => {
    router.push(`/${lang}/profile` as any);
  };

  const showMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='flex items-center justify-center gap-x-2'>
      <Tooltip tooltipContent={'ProDream Home'} side='bottom'>
        <div
          className='flex h-7 cursor-pointer items-center justify-center rounded-lg px-2 transition-all duration-200 hover:bg-white hover:bg-opacity-60'
          onClick={toProfile}
        >
          <Image
            src='/logo/Prodream.png'
            alt='Logo'
            width={130}
            height={20}
            priority
            className='h-5 w-[130px]'
          />
        </div>
      </Tooltip>
      <Separator className='h-5 bg-zinc-400' orientation='vertical' />
      <Popover>
        <Tooltip tooltipContent={'Menu'} side='bottom'>
          <PopoverTrigger asChild>
            <Button
              role='button'
              variant={'icon'}
              onClick={showMenu}
              className='size-max p-0.5'
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
        </Tooltip>
        <PopoverContent
          className='custom-popover-content w-[220px] translate-x-2 backdrop-blur-lg backdrop-filter'
          side='bottom'
          align='end'
        >
          <div className='flex h-[1000px] shrink-0 flex-col'>
            <div className='flex flex-col gap-y-2'>{renderedEngineItems}</div>
            <ul className='mt-auto flex flex-col gap-y-2'>
              {renderedNavItems}
              <Separator className='bg-zinc-500' orientation='horizontal' />
              <UserProfileItem user={user} />
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default memo(LeftTopMenu);
