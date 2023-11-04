'use client';
import React, { useEffect } from 'react';
import { Variants, motion } from 'framer-motion';
import { useSidebar } from '@/context/SidebarpProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Sidebar = () => {
  const pathname = usePathname();
  const { expandSidebar, setExpandSidebar } = useSidebar();
  const toggleSidebar = () => {
    setExpandSidebar(!expandSidebar);
  };

  useEffect(() => {
    if (pathname.includes('templates')) {
      setExpandSidebar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
      <Link href={'/history'}>h</Link>
      <Link href={'/'}>home</Link>
      <Link href={'/templates'}>t</Link>
    </motion.aside>
  );
};

export default Sidebar;
