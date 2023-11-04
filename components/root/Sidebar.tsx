'use client';
import React, { useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const sidebarVariants: Variants = {
    open: { width: '200px' },
    closed: { width: '60px' },
  };
  return (
    <motion.aside
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      className='box flex-col justify-between bg-gradient-to-b from-gray-400 to-gray-600 px-6 py-10 md:flex'
    >
      <button onClick={toggleSidebar}>haha</button>
      sidbar
    </motion.aside>
  );
};

export default Sidebar;
