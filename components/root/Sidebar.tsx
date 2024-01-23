'use client';
import { SidebarLinks } from '@/constant';
import { useUserInfo } from '@/zustand/store';
import { Variants } from 'framer-motion';
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
import Spacer from './Spacer';
import { AnimatedLogo, GiftIcon, HelpIcon } from './SvgComponents';
import User from './User';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const [topValue, setTopValue] = useState<number | undefined>();
  const user = useUserInfo((state) => state.user);

  const logOut = () => {
    removeCookie('token', { path: '/' });
    router.replace('/login');
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

  return (
    <aside className='relative flex w-[300px] shrink-0 flex-col border-r border-r-shadow-border bg-white px-5 py-5'>
      <Link passHref href={'/'}>
        <AnimatedLogo show />
      </Link>
      <Spacer y='50' />
      <DropdownMenu>
        <User name={user.first_name} email={user.email} imgSrc={user.avatar} />
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
            onClick={logOut}
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
              <span
                className={`${
                  isActive ? 'text-doc-primary' : 'text-doc-shadow'
                } base-semibold`}
              >
                {item.title}
              </span>
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
    </aside>
  );
};

export default memo(Sidebar);
