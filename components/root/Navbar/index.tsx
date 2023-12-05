'use client';
import { usePathname } from 'next/navigation';
import React, { memo } from 'react';
import Referal from './Referal';
import dynamic from 'next/dynamic';
import Notification from './Notification';
import UserNavMenu from './UserNavMenu';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex-between relative h-[var(--top-nav-bar-height)] shrink-0 border-b border-shadow-border bg-white px-12 shadow-sidebar'>
      <h3 className='h3-bold hidden capitalize text-black-200 md:block'>
        {pathname.split('/')[2] === 'activityList'
          ? 'Activity List'
          : pathname.split('/')[2] === 'polish'
            ? 'AI Editor'
            : pathname.split('/')[2]}
      </h3>
      <div className='flex items-center gap-x-2 md:gap-x-4'>
        <Referal />
        <Notification />
        <UserNavMenu />
      </div>
    </nav>
  );
};

export default memo(Navbar);
