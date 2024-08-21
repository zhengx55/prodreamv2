'use client';
import EngineItem from '@/components/root/EngineItem';
import NavItem from '@/components/root/NavItem';
import ProfileMenu from '@/components/root/ProfileMenu';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { workbench_engine, workbench_nav } from '@/constant/workbench_constant';
import { useUserSession } from '@/query/session';
import Image from 'next/image';
import { memo, useMemo, useState } from 'react';

/**
 * Component for rendering nav menu
 */
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
    <nav className='flex items-center justify-center gap-x-2'>
      <div className='flex h-7 cursor-pointer items-center justify-center rounded-lg px-2'>
        <Image
          src='/logo/Prodream.png'
          alt='Logo'
          width={200}
          height={50}
          priority
          className='h-5 w-auto'
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
          className='custom-popover-content flex h-[calc(100vh_-5rem)] w-[190px] flex-col justify-between px-2 pb-2'
          side='bottom'
          align='end'
          sideOffset={8}
        >
          <div className='flex flex-col gap-y-2'>{renderedEngineItems}</div>
          <ul className='mt-auto flex flex-col gap-y-2'>
            {/* {renderedNavItems} */}
            <Separator className='bg-zinc-500' orientation='horizontal' />
            {isPending ? (
              <Skeleton className='h-10 w-full rounded-lg' />
            ) : isError ? null : (
              <ProfileMenu user={user} />
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default memo(LeftTopMenu);
