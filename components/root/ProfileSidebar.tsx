'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ProfileSidebarLinks } from '@/constant';
import { AnimatedLogo, AnimatedxsLogo } from './AnimatedLogo';

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [topValue, setTopValue] = useState<number | undefined>();

  const handleNavigation = (link: string, index: number) => {
    router.push(link);
    const newTopValue = index * (48 + 20);
    setTopValue(newTopValue);
  };

  useEffect(() => {
    const currentroute = pathname.split('/')[2];
    let index = 0;
    switch (currentroute) {
      case 'setting':
        index = 0;
        break;
      case 'referrals':
        index = 1;
        break;

      default:
        break;
    }
    setTopValue(index * (48 + 20));
  }, [pathname]);

  return (
    <aside className='relative hidden w-[250px] shrink-0 flex-col border-r border-r-shadow-border bg-white md:flex md:px-2 md:py-5'>
      <div className='h-[30px]'>
        <AnimatedLogo show />
      </div>

      <ul className='relative mt-8 flex flex-col gap-5'>
        {topValue !== undefined ? (
          <span
            style={{ top: topValue }}
            className={`absolute z-30 h-12 w-full rounded-md bg-nav-selected opacity-50 transition-all duration-300 ease-in-out`}
          />
        ) : null}
        {ProfileSidebarLinks.map((item, index) => {
          const isActive = pathname.includes(item.link);
          return (
            <li
              key={item.id}
              onClick={() => handleNavigation(item.link, index)}
              className={`z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-4 text-slate-200 hover:text-slate-300`}
            >
              <span
                className={`${
                  isActive ? 'text-primary-200' : 'text-shadow-100'
                } whitespace-nowrap text-[14px]`}
              >
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
