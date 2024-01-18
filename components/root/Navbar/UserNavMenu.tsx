'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { ProfileDropdownLinks } from '@/constant';
import { userLogOut } from '@/query/api';
import { useReferralsCount } from '@/query/query';
import { useUserInfo } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { Copilot, Stars } from '../SvgComponents';
import User from './User';

const UserNavMenu = () => {
  const user = useUserInfo((state) => state.user);
  const router = useRouter();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const { data: referralCount } = useReferralsCount();
  const { mutateAsync: logOut } = useMutation({
    mutationFn: () => userLogOut(),
    onSuccess: () => {
      removeCookie('token', { path: '/' });
      router.replace('/login');
    },
  });
  const handleProfileClick = async (index: number) => {
    switch (index) {
      case 0:
        router.push('/profile/referrals');
        break;
      case 1:
        window.open('https://quickapply.app/blog', '_blank');
        break;
      case 2:
        await logOut();
        break;
      default:
        break;
    }
  };
  const userAvatar = user.linked_google
    ? user.avatar
    : `${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`;
  return (
    <NavigationMenu className='z-50'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <div className='group'>
              <User
                name={user.first_name}
                email={user.email}
                imgSrc={userAvatar}
              />
              <ChevronUp
                size={20}
                className='relative top-[1px] ml-1 text-shadow-100 transition duration-200 group-data-[state=open]:rotate-180'
                aria-hidden='true'
              />
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent className='flex flex-col bg-white md:w-[320px]'>
            <div className='flex items-start gap-x-2 px-4 py-4'>
              <Avatar>
                <AvatarImage
                  className='rounded-full border border-primary-200 bg-primary-50 object-contain'
                  src={userAvatar}
                  alt={user.first_name}
                />
                <AvatarFallback>{user.first_name}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <h2 className='base-semibold text-black-100'>
                  {user.first_name} {user.last_name}
                </h2>
                <p className='small-regular text-shadow-100'>{user.email}</p>
                <Link
                  href={'/profile/setting'}
                  className='small-semibold cursor-pointer text-primary-200'
                >
                  View profile
                </Link>
              </div>
            </div>
            <Separator orientation='horizontal' className='bg-shadow-border' />
            <div className='flex flex-col gap-y-2 p-4'>
              <Copilot color='#333' size='24' />
              <div className='flex-between'>
                <h1 className='base-semibold'>
                  Referral count: {referralCount}
                </h1>
                <Link
                  href={'/profile/referrals'}
                  className='small-regular text-primary-200'
                >
                  View details
                </Link>
              </div>
              <div className='flex items-center'>
                <span className='relative z-0 -mr-2 h-4 w-full rounded-lg bg-primary-50'>
                  <span className='absolute inset-0 w-1/2 rounded-lg bg-gradient-to-r from-[#E3B8EE52] to-primary-200' />
                </span>
                <span className='flex-center z-10 h-7 w-7 rounded-full bg-primary-50'>
                  <Stars />
                </span>
              </div>
              <p className='small-regular'>
                Refer friends to redeem free college advisory session! ✨
              </p>
            </div>
            <Separator orientation='horizontal' className='bg-shadow-border' />

            {ProfileDropdownLinks.map((item, index) => (
              <Fragment key={item.id}>
                {item.title === 'Log out' ? (
                  <Separator
                    orientation='horizontal'
                    className='bg-shadow-border'
                  />
                ) : null}
                <div
                  className='flex cursor-pointer items-center gap-x-2 px-4 py-3 hover:bg-shadow-50'
                  onClick={() => handleProfileClick(index)}
                >
                  <Image
                    alt={item.title}
                    src={item.image}
                    width={24}
                    height={24}
                    className='h-auto w-auto'
                  />
                  <p className='small-regular'>{item.title}</p>
                </div>
              </Fragment>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UserNavMenu;
