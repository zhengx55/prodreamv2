'use client';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='flex-between h-14 bg-white px-12 shadow-sidebar'>
      <h3 className='h3-bold capitalize text-black-200'>
        {pathname === '/' ? 'editors' : pathname.slice(1)}
      </h3>
    </nav>
  );
};

export default Navbar;
