'use client';
import {
  Bell,
  FileText,
  Headphones,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { memo } from 'react';
import { selectUser } from '@/store/reducers/userReducer';
import { useAppSelector } from '@/store/storehooks';
import Referal from './Referal';
import User from './User';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import dynamic from 'next/dynamic';

const Bulletin = dynamic(() => import('../notification/Bulletin'));

const Navbar = () => {
  const pathname = usePathname();
  const user = useAppSelector(selectUser);
  return (
    <nav className='flex-between h-[var(--top-nav-bar-height)] shrink-0 border-b border-shadow-border bg-white px-12 shadow-sidebar'>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex-center h-11 w-11 cursor-pointer rounded-full bg-primary-50 text-primary-200 transition-transform hover:scale-110 data-[state=open]:bg-primary-200 data-[state=open]:text-primary-50 '>
              <HelpCircle size={22} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='flex flex-col bg-white p-2'>
            <DropdownMenuItem className='flex cursor-pointer gap-x-2 hover:bg-shadow-50'>
              <Lightbulb size={18} /> Tutorial
            </DropdownMenuItem>
            <DropdownMenuItem className='flex cursor-pointer gap-x-2 hover:bg-shadow-50'>
              <FileText size={18} /> Feedback
            </DropdownMenuItem>
            <DropdownMenuItem className='flex cursor-pointer gap-x-2 hover:bg-shadow-50'>
              <Headphones size={18} /> Contact Us
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <User
          name={user.first_name || ''}
          email={user.email || ''}
          imgSrc={`${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`}
        />
      </div>
    </nav>
  );
};

export default memo(Navbar);
