'use client';
import dynamic from 'next/dynamic';
import { useParams, usePathname } from 'next/navigation';
import { memo } from 'react';
import Notification from './Notification';
import { UserSkeleton } from './User';
const UserNavMenu = dynamic(() => import('./UserNavMenu'), {
  ssr: false,
  loading: () => <UserSkeleton />,
});
const Navbar = () => {
  const pathname = usePathname();
  const param = useParams();
  const hideNavbar =
    pathname.split('/')[2] === 'polish' && param.hasOwnProperty('id');
  if (hideNavbar) return null;
  return (
    <nav className='flex-between relative h-[var(--top-nav-bar-height)] shrink-0 border-b border-shadow-border bg-white px-8 shadow-sidebar'>
      <h1 className='h3-bold capitalize text-black-200'>
        {pathname.split('/')[2] === 'activityList'
          ? 'Activity List'
          : pathname.split('/')[2] === 'polish'
            ? 'AI Editor'
            : pathname.split('/')[1] === 'profile'
              ? 'Account Center'
              : pathname.split('/')[2]}
      </h1>
      <div className='flex items-center gap-x-2 md:gap-x-4'>
        <Notification />
        <UserNavMenu />
      </div>
    </nav>
  );
};

export default memo(Navbar);
