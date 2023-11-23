'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AnimatePresence,
  SVGMotionProps,
  Variants,
  motion,
} from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { SidebarLinks } from '@/constant';
import { AnimatedLogo, AnimatedxsLogo } from './AnimatedLogo';
import CommunityCard from './CommunityCard';
import ChatTrigger from '../chatWithMax/ChatTrigger';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import ChatMenu from '../chatWithMax/ChatMenu';
import ChatHistory from '../chatWithMax/ChatHistory';
import MessageList from '../chatWithMax/MessageList';
import { useMaxChatContext } from '@/context/MaxChateProvider';

const Path = (
  props: React.JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => <motion.path fill='#9C2CF3' strokeLinecap='round' {...props} />;

const Sidebar = () => {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [topValue, setTopValue] = useState<number | undefined>();
  const [expandSidebar, setExpandSidebar] = useState(true);
  const { showMenu } = useMaxChatContext();

  const toggleSidebar = () => {
    setExpandSidebar(!expandSidebar);
  };

  const toggleChatModal = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  const handleNavigation = (link: string, index: number) => {
    router.push(link);
    const newTopValue = index * (48 + 20);
    localStorage.setItem('sidebarPos', newTopValue.toString());
    setTopValue(newTopValue);
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
      className='relative hidden shrink-0 flex-col border-r border-r-shadow-border bg-white md:flex md:px-2 md:py-5'
    >
      <div className='h-[30px]'>
        <AnimatedLogo show={expandSidebar} />
        <AnimatedxsLogo show={!expandSidebar} />
      </div>
      <motion.span
        onClick={toggleSidebar}
        whileHover={{
          scale: 1.1,
        }}
        className='flex-center absolute -right-5 top-2 h-10 w-10 cursor-pointer rounded-full border border-shadow-border bg-white'
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
      </motion.span>

      <Dialog>
        {expandSidebar ? (
          <ChatTrigger open={modalOpen} onOpenChage={toggleChatModal} />
        ) : (
          <DialogTrigger asChild>
            <div
              className='flex-center ml-2 mt-8 h-11 w-11 cursor-pointer rounded-[47px] rounded-bl-none bg-primary-50 transition-transform hover:-translate-y-1'
              onClick={() => setModalOpen(true)}
            >
              <Image
                alt='max'
                src='/max.png'
                className='h-auto w-5'
                width={0}
                height={0}
              />
            </div>
          </DialogTrigger>
        )}
        <DialogContent className='flex gap-0 p-0 md:h-[700px] md:w-[900px]'>
          <div className='flex w-[70%] flex-col items-center gap-y-2 px-10 pt-[100px]'>
            {showMenu ? <ChatMenu /> : <MessageList />}
          </div>
          <ChatHistory />
        </DialogContent>
      </Dialog>

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
              <div className='flex items-center gap-x-2'>
                <Image
                  src={isActive ? item.active_image : item.image}
                  alt={item.title}
                  width={24}
                  height={24}
                  className='h-auto w-auto'
                  priority
                />
              </div>
              <AnimatePresence>
                {expandSidebar && (
                  <motion.span
                    initial='hidden'
                    animate='show'
                    exit='hidden'
                    variants={sidebarTitleVariants}
                    className={`${
                      isActive ? 'text-primary-200' : 'text-shadow-100'
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
      {expandSidebar && <CommunityCard />}
    </motion.aside>
  );
};

export default Sidebar;
