'use client';
import { SidebarLinks } from '@/constant';
import { useMembershipInfo } from '@/hooks/useMemberShip';
import { Locale } from '@/i18n-config';
import { useModal, useUserInfo } from '@/zustand/store';
import type { Route } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import Trigger from '../notification/Trigger';
import { Button } from '../ui/button';
import Icon from './Icon';
import Spacer from './Spacer';
import { UserSkeleton } from './User';

const useSidebarElevation = (pathname: string) => {
  const [topValue, setTopValue] = useState<number | undefined>();
  const changeTopValue = useCallback((value: number) => {
    setTopValue(value);
  }, []);

  useEffect(() => {
    const currentroute = pathname.split('/').pop();
    switch (currentroute) {
      case 'editor':
        setTopValue(0);
        break;
      case 'essay-review':
        setTopValue(48 + 10);
        break;
      case 'pdf-chat':
        setTopValue(2 * (48 + 10));
        break;
      default:
        setTopValue(undefined);
        break;
    }
  }, [pathname]);
  return { topValue, changeTopValue };
};

const User = dynamic(() => import('./User'), {
  loading: () => <UserSkeleton />,
});

const Sidebar = ({ lang }: { lang: Locale }) => {
  const pathname = usePathname();
  const { topValue, changeTopValue } = useSidebarElevation(pathname);
  const updateFeedbackModal = useModal((state) => state.updateFeedbackModal);

  const router = useRouter();
  const { isPending: memberShipPending, data: memberShip } =
    useMembershipInfo();
  const user = useUserInfo((state) => state.user);
  const handleNavigation = (link: string, index: number) => {
    router.push(`/${lang}/${link}` as Route);
    const newTopValue = index * (48 + 10);
    changeTopValue(newTopValue);
  };

  return (
    <aside className='relative flex w-[240px] shrink-0 flex-col border-r border-r-shadow-border bg-white px-3 py-4'>
      <Link passHref href={`/${lang}`}>
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
      <div className='flex-between w-full items-center'>
        {!user.first_name ? (
          <UserSkeleton />
        ) : (
          <User
            lang={lang}
            name={user.first_name}
            email={user.email}
            imgSrc={user.avatar}
          />
        )}
        <Trigger />
      </div>

      <Spacer y='24' />
      <ul className='relative flex flex-col gap-2.5'>
        {topValue !== undefined ? (
          <span
            style={{ top: topValue }}
            className={`absolute z-30 h-12 w-full rounded-md bg-slate-100 transition-all duration-300 ease-in-out`}
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
                  isActive ? 'text-violet-500' : 'text-zinc-600'
                } base-regular`}
              >
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>

      <div className='mt-auto flex flex-col'>
        <Link
          href={'https://discord.gg/xXSFXv5kPd'}
          target='_blank'
          className='z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-2 hover:bg-slate-100'
        >
          <Icon
            width={20}
            height={20}
            alt='discord'
            src='/nav/discord.svg'
            priority
          />
          <p className='base-regular text-zinc-600'>Discord</p>
        </Link>
        <div
          role='dialog'
          className='z-50 flex h-12 cursor-pointer items-center gap-x-2 rounded-md pl-2 hover:bg-slate-100'
          onClick={() => updateFeedbackModal(true)}
        >
          <Icon
            width={20}
            height={20}
            alt='contact support'
            src='/nav/message.svg'
            priority
          />
          <p className='base-regular text-zinc-600'>Contact Support</p>
        </div>
        {memberShipPending ? null : memberShip?.subscription === 'basic' ? (
          <Link href={'/pricing'} passHref>
            <Button className='w-full rounded-lg bg-violet-500'>
              <Icon
                width={24}
                height={24}
                className='size-6'
                priority
                alt='diamond'
                src='/editor/gem.svg'
              />
              <p className='base-semibold'>Upgrade</p>
            </Button>
          </Link>
        ) : null}
      </div>
    </aside>
  );
};

export default memo(Sidebar);
