'use client';
import { SidebarLinks } from '@/constant';
import { useMembershipInfo } from '@/query/query';
import { useUserInfo } from '@/zustand/store';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu } from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import Spacer from './Spacer';
import { Diamond, Feedback } from './SvgComponents';
import User from './User';

const UserInfoDropdown = dynamic(() => import('./UserInfoDropdown'));

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [topValue, setTopValue] = useState<number | undefined>();
  const { isPending: memberShipPending, data: memberShip } =
    useMembershipInfo();
  console.log(memberShip);
  const user = useUserInfo((state) => state.user);
  const handleNavigation = (link: string, index: number) => {
    router.push(link);
    const newTopValue = index * (48 + 20);
    setTopValue(newTopValue);
  };

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
    setTopValue(index * (48 + 20));
  }, [pathname]);

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
      <Spacer y='50' />
      <DropdownMenu>
        <User name={user.first_name} email={user.email} imgSrc={user.avatar} />
        <UserInfoDropdown />
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
        <Link passHref href={'https://tally.so/r/3NovEO'} target='_blank'>
          <div
            role='link'
            className='flex cursor-pointer gap-x-2 rounded-xl bg-doc-secondary p-2'
          >
            <Feedback />
            <p className='text-md font-[500] text-doc-shadow'>
              Submit feedback
            </p>
          </div>
        </Link>
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
