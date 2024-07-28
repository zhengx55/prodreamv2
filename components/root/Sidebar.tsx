'use client';
import { workbench_engine, workbench_nav } from '@/constant/workbench_constant';
import { useUserInfo } from '@/zustand/store';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC, memo, useMemo, useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import Icon from './Icon';
import Spacer from './Spacer';

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
    <HoverCard
      openDelay={50}
      closeDelay={50}
      open={isHovering}
      onOpenChange={setisHovering}
      key={item.id}
    >
      <HoverCardTrigger asChild>
        <div
          className={`${isHovering && 'border-white bg-white/60 shadow'} flex-center w-full cursor-pointer flex-col gap-y-2 rounded-lg border border-transparent bg-white/30 py-4`}
        >
          <Image
            src={item.image}
            alt={item.name}
            priority
            width={60}
            height={60}
            className='h-auto w-14'
          />
          <h2>{item.name}</h2>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side='right'
        align='start'
        className='flex w-[357px] flex-col rounded-lg border border-white bg-white/60 px-4 py-4 shadow backdrop-blur-lg'
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
              className='rounded-full bg-white px-2 py-1 text-xs leading-tight text-violet-600'
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
      </HoverCardContent>
    </HoverCard>
  );
};

const NavItem: FC<NavItemProps> = ({ item }) => (
  <li
    key={item.id}
    className='inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white hover:bg-white/60 hover:shadow'
  >
    <Icon
      src={item.icon}
      alt={item.title}
      width={25}
      height={25}
      className='h-auto w-5'
      priority
    />
    <p className='text-zinc-600'>{item.title}</p>
  </li>
);

const UserProfileItem: FC<UserProfileItemProps> = ({ user }) => (
  <li className='inline-flex w-full cursor-pointer items-center gap-x-2 rounded-lg border border-transparent px-2 py-1.5 hover:border-white hover:bg-white/60 hover:shadow'>
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
    <p className='text-zinc-600'>{user.first_name}</p>
    <ChevronRight className='ml-auto' size={16} />
  </li>
);

const Sidebar: FC = () => {
  const tEditor = useTranslations('Editor');
  const { lang } = useParams<{ lang: string }>();
  const isInCN = lang === 'cn';
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

  return (
    <aside className='relative flex w-[200px] shrink-0 flex-col px-6 py-9'>
      <Link passHref href={`/${lang}`}>
        <Image
          alt='prodream'
          src='/logo/Prodream.png'
          width={150}
          height={30}
          className='h-auto w-36'
          priority
        />
      </Link>
      <Spacer y='24' />
      <div className='flex flex-col gap-y-2'>{renderedEngineItems}</div>
      <ul className='mt-auto flex flex-col gap-y-2'>
        {renderedNavItems}
        <Separator className='bg-zinc-500' orientation='horizontal' />
        <UserProfileItem user={user} />
      </ul>
    </aside>
  );
};

export default memo(Sidebar);
