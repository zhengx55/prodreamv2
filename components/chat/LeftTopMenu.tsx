'use client';
import { workbench_engine, workbench_nav } from '@/constant/workbench_constant';
import { useUserInfo } from '@/zustand/store';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Tooltip from '@/components/root/Tooltip';
import { useRouter, useParams } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FC, memo, useMemo, useState } from 'react';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import Icon from '@/components/root/Icon';
import Spacer from '@/components/root/Spacer';

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

const UserProfileItem: FC<UserProfileItemProps> = ({ user }) => (
  <li className='group inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white hover:bg-[#6866E2] hover:shadow'>
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
    <p className='text-zinc-600 group-hover:text-white'>{user.first_name}</p>
    <ChevronRight className='ml-auto' size={16} />
  </li>
);

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

  const toHome = () => {
    router.push(`/${lang}`);
  };

  const showMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='flex items-center justify-center'>
      <Tooltip tooltipContent={'ProDream Home'} side='bottom'>
        <div
          className='flex h-7 cursor-pointer items-center justify-center rounded-lg px-2 transition-all duration-200 hover:bg-white hover:bg-opacity-60'
          onClick={toHome}
        >
          <Image src='/logo/Prodream.png' alt='Logo' width={94} height={15} />
        </div>
      </Tooltip>
      <div className='mx-2 h-5 w-px bg-[#C9CFDC]' />
      <Popover>
        <PopoverTrigger>
          <Tooltip tooltipContent={'Menu'} side='bottom'>
            <div
              className='flex h-7 cursor-pointer items-center justify-center rounded-lg px-1 transition-all duration-200 hover:bg-white hover:bg-opacity-60'
              onClick={showMenu}
            >
              <Image
                src='/workbench/menu_icon.svg'
                alt='Menu Icon'
                width={20}
                height={20}
              />
            </div>
          </Tooltip>
        </PopoverTrigger>
        <PopoverContent className='custom-popover-content w-[260px]'>
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

export default LeftTopMenu;
