'use client';
import { Bell, HelpCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import User from './User';
import { selectUser } from '@/store/reducers/userReducer';
import { useAppSelector } from '@/store/storehooks';

const Navbar = () => {
  const pathname = usePathname();
  const user = useAppSelector(selectUser);
  return (
    <nav className='flex-between h-[var(--top-nav-bar-height)] shrink-0 border-b border-shadow-border bg-white px-12 shadow-sidebar'>
      <h3 className='h3-bold hidden capitalize text-black-200 md:block'>
        {pathname.split('/')[2] === 'activityList'
          ? 'Activity List'
          : pathname.split('/')[2]}
      </h3>
      <div className='flex items-center gap-x-2 md:gap-x-6'>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className='flex-center h-12 w-12 cursor-pointer rounded-full bg-primary-50'
        >
          <HelpCircle className='text-primary-200' size={22} />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className='flex-center h-12 w-12 cursor-pointer rounded-full bg-primary-50'
        >
          <Bell className='text-primary-200' size={22} />
        </motion.div>
        <User
          name={user.first_name || ''}
          email={user.email || ''}
          imgSrc={'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
        />
      </div>
    </nav>
  );
};

export default memo(Navbar);
