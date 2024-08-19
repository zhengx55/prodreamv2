'use client';

import EngineItem from '@/components/root/EngineItem';
import NavItem from '@/components/root/NavItem';
import ProfileMenu from '@/components/root/ProfileMenu';
import Spacer from '@/components/root/Spacer';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { workbench_engine, workbench_nav } from '@/constant/workbench_constant';
import { useUserSession } from '@/query/session';
import Image from 'next/image';
import { useMemo } from 'react';

const Sidebar = () => {
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
  return (
    <aside className='flex w-40 flex-col pr-2 pt-2'>
      <Image
        src='/logo/Prodream.png'
        alt='Logo'
        width={130}
        height={20}
        priority
        className='h-5 w-[130px]'
      />
      <Spacer y='24' />
      <div className='flex flex-col gap-y-2'>{renderedEngineItems}</div>
      {/* <ul className='mt-auto flex flex-col gap-y-2'>{renderedNavItems}</ul> */}
      <Spacer y='8' />
      <Separator className='mt-auto bg-zinc-500' orientation='horizontal' />
      <Spacer y='8' />
      {isPending ? (
        <Skeleton className='h-10 w-full rounded-lg' />
      ) : isError ? null : (
        <ProfileMenu user={user} />
      )}
    </aside>
  );
};

export default Sidebar;
