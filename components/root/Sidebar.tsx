'use client';
import { SidebarLinks } from '@/constant';
import { useUserInfo } from '@/zustand/store';
import {
  AnimatePresence,
  LazyMotion,
  Variants,
  domAnimation,
  m,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import User from './Navbar/User';
import Spacer from './Spacer';
import { AnimatedLogo, LayoutRight } from './SvgComponents';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [topValue, setTopValue] = useState<number | undefined>();
  const [expandSidebar, setExpandSidebar] = useState(true);
  const user = useUserInfo((state) => state.user);

  const toggleSidebar = () => {
    setExpandSidebar(!expandSidebar);
  };

  const handleNavigation = (link: string, index: number) => {
    router.push(link);
    const newTopValue = index * (48 + 20);
    setTopValue(newTopValue);
  };

  useEffect(() => {
    const currentroute = pathname.split('/')[2];
    let index = 0;
    switch (currentroute) {
      case 'polish':
        index = 0;
        break;
      default:
        break;
    }
    setTopValue(index * (48 + 20));
  }, [pathname]);

  const sidebarVariants: Variants = {
    open: { width: '300px' },
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
  const userAvatar = user.linked_google
    ? user.avatar
    : `${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`;
  return (
    <LazyMotion features={domAnimation}>
      <m.aside
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        initial={false}
        animate={expandSidebar ? 'open' : 'closed'}
        variants={sidebarVariants}
        className='relative flex shrink-0 flex-col border-r border-r-shadow-border bg-white px-5 py-5'
      >
        {expandSidebar ? (
          <div className='flex-between'>
            <Link passHref href={'/'}>
              <AnimatedLogo show={expandSidebar} />
            </Link>
            <LayoutRight className='cursor-pointer' onClick={() => {}} />
          </div>
        ) : null}
        <Spacer y='50' />
        <User name={user.first_name} email={user.email} imgSrc={userAvatar} />
        <Spacer y='24' />
        <ul className='relative flex flex-col gap-5'>
          {topValue !== undefined ? (
            <span
              style={{ top: topValue }}
              className={`absolute z-30 h-12 w-full rounded-md bg-doc-secondary transition-all duration-300 ease-in-out`}
            />
          ) : null}
          {SidebarLinks.map((item, index) => {
            const isActive = pathname.includes(item.link);
            return (
              <li
                key={item.id}
                onClick={() => handleNavigation(item.link, index)}
                className={`z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-4`}
              >
                <Image
                  src={isActive ? item.active_image : item.image}
                  alt={'sidebar'}
                  width={24}
                  height={24}
                  className='h-auto w-auto'
                  priority
                />
                <AnimatePresence>
                  {expandSidebar && (
                    <m.span
                      initial='show'
                      animate='show'
                      exit='hidden'
                      variants={sidebarTitleVariants}
                      className={`${
                        isActive ? 'text-doc-primary' : 'text-doc-shadow'
                      } base-semibold`}
                    >
                      {item.title}
                    </m.span>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </m.aside>
    </LazyMotion>
  );
};

export default memo(Sidebar);
