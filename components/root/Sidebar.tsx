'use client';
import { SidebarLinks } from '@/constant';
import MaxChatProvider from '@/context/MaxChateProvider';
import {
  AnimatePresence,
  LazyMotion,
  SVGMotionProps,
  Variants,
  domAnimation,
  m,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { memo, useEffect, useState } from 'react';
import ChatModal from '../chatWithMax/ChatModal';
import CommunityCard from './CommunityCard';
import { AnimatedLogo, AnimatedxsLogo } from './SvgComponents';

const Path = (
  props: React.JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => <m.path fill='#9C2CF3' strokeLinecap='round' {...props} />;

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
  };

  useEffect(() => {
    const currentroute = pathname.split('/')[2];
    let index = 0;
    switch (currentroute) {
      case 'polish':
        index = 0;
        break;
      case 'brainstorm':
        index = 1;
        break;
      case 'activityList':
        index = 2;
        break;
      default:
        break;
    }
    setTopValue(index * (48 + 20));
  }, [pathname]);

  const sidebarVariants: Variants = {
    open: { width: '180px' },
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
    <MaxChatProvider>
      <LazyMotion features={domAnimation}>
        <m.aside
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          initial={false}
          animate={expandSidebar ? 'open' : 'closed'}
          variants={sidebarVariants}
          className='relative hidden shrink-0 flex-col border-r border-r-shadow-border bg-white sm:flex sm:px-2 sm:py-5'
        >
          <Link passHref href={'/'}>
            <AnimatedLogo show={expandSidebar} />
            <AnimatedxsLogo show={!expandSidebar} />
          </Link>

          <m.span
            onClick={toggleSidebar}
            whileHover={{
              scale: 1.1,
            }}
            className='flex-center absolute -right-5 top-2 z-50 h-10 w-10 cursor-pointer rounded-full border border-shadow-border bg-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <Path
                d='M 2 9.423 L 20 9.423'
                animate={expandSidebar ? 'open' : 'closed'}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
              />

              <Path
                animate={expandSidebar ? 'open' : 'closed'}
                variants={{
                  closed: {
                    d: 'M10.061 19.061L17.121 12L10.061 4.939L7.939 7.061L12.879 12L7.939 16.939L10.061 19.061Z',
                  },
                  open: {
                    d: 'M13.939 4.93896L6.879 12L13.939 19.061L16.061 16.939L11.121 12L16.061 7.06096L13.939 4.93896Z',
                  },
                }}
              />
            </svg>
          </m.span>
          <ChatModal expandSidebar={expandSidebar} />

          <ul className='relative mt-8 flex flex-col gap-5'>
            {topValue !== undefined ? (
              <span
                style={{ top: topValue }}
                className={`absolute z-30 h-12 w-full rounded-md bg-nav-selected opacity-50 transition-all duration-300 ease-in-out`}
              />
            ) : null}
            {SidebarLinks.map((item, index) => {
              const isActive = pathname.includes(item.link);
              return (
                <li
                  key={item.id}
                  onClick={() => handleNavigation(item.link, index)}
                  className={`z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-4 text-slate-200 hover:text-slate-300`}
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
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                        variants={sidebarTitleVariants}
                        className={`${
                          isActive ? 'text-primary-200' : 'text-shadow-100'
                        } whitespace-nowrap text-[14px]`}
                      >
                        {item.title}
                      </m.span>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          {expandSidebar && <CommunityCard />}
        </m.aside>
      </LazyMotion>
    </MaxChatProvider>
  );
};

export default memo(Sidebar);
