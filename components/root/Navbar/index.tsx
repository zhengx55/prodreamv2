'use client';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { memo } from 'react';
import Notification from './Notification';
import Referal from './Referal';
import { UserSkeleton } from './User';
const UserNavMenu = dynamic(() => import('./UserNavMenu'), {
  ssr: false,
  loading: () => <UserSkeleton />,
});
const Navbar = () => {
  const pathname = usePathname();
  const param = useParams();
  return (
    <nav className='flex-between relative h-[var(--top-nav-bar-height)] shrink-0 border-b border-shadow-border bg-white px-12 shadow-sidebar'>
      <h1 className='h3-bold capitalize text-black-200'>
        {pathname.split('/')[2] === 'activityList' ? (
          'Activity List'
        ) : pathname.split('/')[2] === 'polish' ? (
          param.hasOwnProperty('id') ? (
            <Link
              className='flex items-center gap-x-1'
              href={'/writtingpal/polish'}
            >
              <ChevronLeft />
              Home
            </Link>
          ) : (
            'AI Editor'
          )
        ) : pathname.split('/')[1] === 'profile' ? (
          'Account Center'
        ) : (
          pathname.split('/')[2]
        )}
      </h1>
      <div className='flex items-center gap-x-2 md:gap-x-4'>
        <Referal />
        <Notification />
        <UserNavMenu />
      </div>
    </nav>
  );
};

export default memo(Navbar);
