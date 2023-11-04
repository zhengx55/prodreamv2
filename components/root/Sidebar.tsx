'use client';
import React, { useState } from 'react';
import { Variants, motion } from 'framer-motion';
import { useSidebar } from '@/context/SidebarpProvider';
const Sidebar = () => {
  const { expandSidebar, setExpandSidebar } = useSidebar();
  const toggleSidebar = () => {
    setExpandSidebar(!expandSidebar);
  };
  const sidebarVariants: Variants = {
    open: { width: '280px' },
    closed: { width: '50px' },
  };
  return (
    <motion.aside
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      initial={false}
      animate={expandSidebar ? 'open' : 'closed'}
      variants={sidebarVariants}
      className='hidden flex-col justify-between bg-gradient-to-b from-gray-400 to-gray-600 px-6 py-10 shadow-sidebar md:flex'
    >
      <button onClick={toggleSidebar}>haha</button>
      sidbar
    </motion.aside>
  );
};

export default Sidebar;
