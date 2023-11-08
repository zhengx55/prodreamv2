'use client';
import { Bell, HelpCircle, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@nextui-org/user';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='flex-between border-b-1 border-shadow-border bg-white px-12 shadow-sidebar md:h-[var(--top-nav-bar-height)]'>
      <h3 className='h3-bold capitalize text-black-200'>
        {pathname.split('/')[2]}
      </h3>
      <div className='flex items-center gap-x-6'>
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
          name='Jane Doe'
          className='gap-x-2'
          classNames={{
            name: 'small-semibold text-black-100',
            description: 'subtle-semibold text-shadow-100',
          }}
          description='Product Designer'
          avatarProps={{
            showFallback: true,
            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            classNames: {
              base: 'bg-primary-50 w-12 h-12 border-1 border-primary-200',
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
