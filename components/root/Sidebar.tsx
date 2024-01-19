'use client';
import { SidebarLinks } from '@/constant';
import { userLogOut } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import {
  AnimatePresence,
  LazyMotion,
  Variants,
  domAnimation,
  m,
} from 'framer-motion';
import { LogOut, MailOpen, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import User from './Navbar/User';
import Spacer from './Spacer';
import { AnimatedLogo, GiftIcon, HelpIcon, LayoutRight } from './SvgComponents';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const [topValue, setTopValue] = useState<number | undefined>();
  const [expandSidebar, setExpandSidebar] = useState(true);
  const user = useUserInfo((state) => state.user);
  const { mutateAsync: logOut } = useMutation({
    mutationFn: () => userLogOut(),
    onSuccess: () => {
      removeCookie('token', { path: '/' });
      router.replace('/login');
    },
  });
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
        <DropdownMenu>
          <User name={user.first_name} email={user.email} imgSrc={userAvatar} />
          <DropdownMenuContent
            align='start'
            className='w-60 rounded-lg bg-white shadow-lg'
          >
            <Link href={'/profile/setting'} passHref>
              <DropdownMenuItem className='cursor-pointer gap-x-2.5 rounded text-doc-shadow hover:bg-doc-secondary hover:text-doc-primary'>
                <User2 size={20} />
                <span className='text-md font-[500]'>View Profile</span>{' '}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className='cursor-pointer gap-x-2.5  rounded text-doc-shadow hover:bg-doc-secondary hover:text-doc-primary'>
              <MailOpen size={20} />
              <span className='text-md font-[500]'>Notification</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => await logOut()}
              className='cursor-pointer gap-x-2.5  rounded text-doc-shadow hover:bg-doc-secondary hover:text-doc-primary'
            >
              <LogOut size={20} />
              <span className='text-md font-[500]'>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        <div className='mt-auto flex flex-col gap-y-6'>
          <div className='flex gap-x-2'>
            <GiftIcon />
            <p className='text-md font-[500] text-doc-shadow'>Refer And Earn</p>
          </div>
          <div className='flex gap-x-2'>
            <HelpIcon />
            <p className='text-md font-[500] text-doc-shadow'>Help</p>
          </div>
        </div>
        <Spacer y='20' />
      </m.aside>
    </LazyMotion>
  );
};

export default memo(Sidebar);
