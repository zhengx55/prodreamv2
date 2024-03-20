'use client';
import { SidebarLinks } from '@/constant';
import { useMembershipInfo } from '@/query/query';
import { useUserInfo } from '@/zustand/store';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu } from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import Spacer from './Spacer';
import { Diamond } from './SvgComponents';
import { UserSkeleton } from './User';

const useSidebarElevation = (pathname: string) => {
  const [topValue, setTopValue] = useState<number | undefined>();

  const changeTopValue = useCallback((value: number) => {
    setTopValue(value);
  }, []);

  useEffect(() => {
    const currentroute = pathname.split('/')[1];
    let index = 0;
    switch (currentroute) {
      case 'polish':
        index = 0;
        break;
      case 'essay-review':
        index = 1;
        break;
      case 'pdf-chat':
        index = 2;
        break;
      default:
        break;
    }
    setTopValue(index * (48 + 10));
  }, [pathname]);
  return { topValue, changeTopValue };
};

const UserInfoDropdown = dynamic(() => import('./UserInfoDropdown'));
const User = dynamic(() => import('./User'), {
  loading: () => <UserSkeleton />,
});
const Sidebar = () => {
  const pathname = usePathname();
  const { topValue, changeTopValue } = useSidebarElevation(pathname);
  const router = useRouter();
  const { isPending: memberShipPending, data: memberShip } =
    useMembershipInfo();
  const user = useUserInfo((state) => state.user);
  const handleNavigation = (link: string, index: number) => {
    router.push(link);
    const newTopValue = index * (48 + 10);
    changeTopValue(newTopValue);
  };

  return (
    <aside className='relative flex w-[240px] shrink-0 flex-col border-r border-r-shadow-border bg-white px-5 py-5'>
      <Link passHref href={'/'}>
        <Image
          alt='prodream'
          src='/logo/Prodream.png'
          width={150}
          height={30}
          className='h-auto w-36'
          priority
        />
      </Link>
      <Spacer y='40' />
      <DropdownMenu>
        {!user.first_name ? (
          <UserSkeleton />
        ) : (
          <User
            name={user.first_name}
            email={user.email}
            imgSrc={user.avatar}
          />
        )}
        <UserInfoDropdown />
      </DropdownMenu>
      <Spacer y='24' />
      <ul className='relative flex flex-col gap-2.5'>
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
              className={`z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-2`}
            >
              <Image
                src={isActive ? item.active_image : item.image}
                alt={'sidebar'}
                width={20}
                height={20}
                priority
              />
              <span
                className={`${
                  isActive ? 'text-doc-primary' : 'text-zinc-600'
                } base-regular`}
              >
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
      <div className='mt-auto flex flex-col'>
        {memberShipPending ? (
          <Skeleton className='h-10 w-full rounded-lg' />
        ) : memberShip?.subscription === 'basic' ? (
          <Link href={'/pricing'} passHref>
            <Button className='w-full rounded-lg bg-doc-primary'>
              <Diamond size='22' />
              <p className='base-semibold'>Upgrade</p>
            </Button>
          </Link>
        ) : null}
      </div>
    </aside>
  );
};

export default memo(Sidebar);
