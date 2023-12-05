import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import React, { Fragment } from 'react';
import User from './User';
import { ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ProfileDropdownLinks } from '@/constant';
import { userLogOut } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '@/store/storehooks';
import { useRouter } from 'next/navigation';
import { selectUser } from '@/store/reducers/userSlice';
import { useCookies } from 'react-cookie';
import Image from 'next/image';

const UserNavMenu = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const { mutateAsync: logOut } = useMutation({
    mutationFn: () => userLogOut(),
    onSuccess: () => {
      removeCookie('token', { path: '/' });
      router.push('/login');
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
  return (
    <NavigationMenu className='z-50'>
      <NavigationMenuItem>
        <NavigationMenuTrigger asChild>
          <div className='group'>
            <User
              name={user.first_name || ''}
              email={user.email || ''}
              imgSrc={`${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`}
            />
            <ChevronUp
              className='relative top-[1px] ml-1 h-7 w-7 text-shadow-100 transition duration-200 group-data-[state=open]:rotate-180'
              aria-hidden='true'
            />
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className='flex flex-col bg-white md:w-[320px]'>
          <div className='flex items-start gap-x-2 px-4 py-4'>
            <Avatar>
              <AvatarImage
                className='rounded-full border border-primary-200 bg-primary-50 object-contain'
                src={`${process.env.NEXT_PUBLIC_API_STATIC_URL}${user.avatar}`}
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
    </NavigationMenu>
  );
};

export default UserNavMenu;
