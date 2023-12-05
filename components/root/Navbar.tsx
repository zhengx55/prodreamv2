'use client';
import { Bell, ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { memo } from 'react';
import { selectUser } from '@/store/reducers/userSlice';
import { useAppSelector } from '@/store/storehooks';
import Referal from './Referal';
import User from './User';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import dynamic from 'next/dynamic';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { ProfileDropdownLinks } from '@/constant';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import Link from 'next/link';

const Bulletin = dynamic(() => import('../notification/Bulletin'));

const Navbar = () => {
  const pathname = usePathname();
  const user = useAppSelector(selectUser);
  const handleProfileClick = () => {};
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex-center h-11 w-11 cursor-pointer rounded-full bg-primary-50 text-primary-200 transition-transform hover:scale-110 data-[state=open]:bg-primary-200 data-[state=open]:text-primary-50 '>
              <Bell size={22} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='flex flex-col bg-white p-4 md:h-[450px] md:w-[630px]'>
            <Bulletin />
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex-center h-11 w-11 cursor-pointer rounded-full bg-primary-50 text-primary-200 transition-transform hover:scale-110 data-[state=open]:bg-primary-200 data-[state=open]:text-primary-50 '>
              <HelpCircle size={22} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='flex flex-col bg-white p-2'>
            <DropdownMenuItem className='flex cursor-pointer gap-x-2 hover:bg-shadow-50'>
              <Lightbulb size={18} /> Tutorial
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link
                className='flex cursor-pointer gap-x-2 hover:bg-shadow-50'
                href={'https://tally.so/r/wberBE'}
                target='_blank'
              >
                <FileText size={18} /> Feedback
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex cursor-pointer gap-x-2 hover:bg-shadow-50'>
              <Headphones size={18} /> Contact Us
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <NavigationMenu className='z-50'>
          <NavigationMenuItem>
            <NavigationMenuTrigger asChild>
              <div className='group'>
                <User
                  name={user.first_name || ''}
                  email={user.email || ''}
                  imgSrc={`${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`}
                />
                <ChevronUp
                  className='relative top-[1px] ml-1 h-7 w-7 text-shadow-100 transition duration-200 group-data-[state=open]:rotate-180'
                  aria-hidden='true'
                />
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className='flex flex-col bg-white md:w-[320px]'>
              <div className='flex items-start gap-x-2 px-4 py-4'>
                <Avatar>
                  <AvatarImage
                    className='rounded-full border border-primary-200 bg-primary-50 object-contain'
                    src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`}
                    alt={user.first_name}
                  />
                  <AvatarFallback>{user.first_name}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <h2 className='base-semibold text-black-100'>
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className='small-regular text-shadow-100'>{user.email}</p>
                  <Link
                    href={'/profile/setting'}
                    className='small-semibold cursor-pointer text-primary-200'
                  >
                    View profile
                  </Link>
                </div>
              </div>
              <Separator
                orientation='horizontal'
                className='bg-shadow-border'
              />
              {ProfileDropdownLinks.map((item) => (
                <>
                  {item.title === 'Log out' ? (
                    <Separator
                      orientation='horizontal'
                      className='bg-shadow-border'
                    />
                  ) : null}
                  <div
                    key={item.id}
                    className='flex cursor-pointer items-center gap-x-2 px-4 py-3 hover:bg-shadow-50'
                  >
                    <Image
                      alt={item.title}
                      src={item.image}
                      width={24}
                      height={24}
                      className='h-auto w-auto'
                    />
                    <p className='small-regular'>{item.title}</p>
                  </div>
                </>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default memo(Navbar);
