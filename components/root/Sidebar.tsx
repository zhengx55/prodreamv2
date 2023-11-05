'use client';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarLinks } from '@/contant';
import { File } from 'lucide-react';
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [topValue, setTopValue] = useState<number | undefined>();
  const [expandSidebar, setExpandSidebar] = useState(true);

  const toggleSidebar = () => {
    setExpandSidebar(!expandSidebar);
  };

  const handleNavigation = (link: string, index: number) => {
    router.push(link);
    const newTopValue = index * (48 + 20);
    setTopValue(newTopValue);
    localStorage.setItem('sidebarPos', newTopValue.toString());
  };

  useEffect(() => {
    const storedTopValue = localStorage.getItem('sidebarPos');
    if (storedTopValue) {
      setTopValue(parseInt(storedTopValue));
    }
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      setExpandSidebar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const sidebarVariants: Variants = {
    open: { width: '250px' },
    closed: { width: '70px' },
  };

  const sidebarTitleVariants: Variants = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.aside
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      initial={false}
      animate={expandSidebar ? 'open' : 'closed'}
      variants={sidebarVariants}
      className='hidden flex-col bg-white px-2 py-10 shadow-sidebar md:flex'
    >
      <button onClick={toggleSidebar}>h</button>

      <ul className='relative mt-5 flex flex-col gap-5'>
        {topValue !== undefined ? (
          <span
            style={{ top: topValue }}
            className={`absolute z-30 h-12 w-full rounded-md bg-nav-selected opacity-50 transition-all duration-300 ease-in-out`}
          />
        ) : null}
        {SidebarLinks.map((item, index) => {
          const isActive = pathname === item.link;
          return (
            <li
              key={item.id}
              onClick={() => handleNavigation(item.link, index)}
              className={`z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-4 text-slate-200 hover:text-slate-300`}
            >
              <File size={20} className=' text-nav' />
              <AnimatePresence>
                {expandSidebar && (
                  <motion.span
                    initial='hidden'
                    animate='show'
                    exit='hidden'
                    variants={sidebarTitleVariants}
                    className={`${
                      isActive ? 'text-nav-active' : 'text-nav'
                    } whitespace-nowrap text-[14px]`}
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;
