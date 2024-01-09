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
import { Stars } from '../SvgComponents';
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M16.9907 2.92981C16.6357 2.92981 16.2687 3.12381 16.0847 3.49231C15.6477 4.36501 15.5137 4.65211 15.3347 4.92981C15.0437 5.37981 14.8047 5.55921 14.1787 5.80481C14.0367 5.86031 13.8697 5.92861 13.6787 5.99231C12.8327 6.27401 12.7567 7.43761 13.5537 7.83601C14.3977 8.25811 14.6297 8.39731 14.8657 8.55481C15.0897 8.70381 15.2167 8.83131 15.3657 9.05481C15.5237 9.29101 15.6627 9.52331 16.0847 10.3678C16.4527 11.1048 17.5287 11.1048 17.8967 10.3678C18.3187 9.52331 18.4587 9.29111 18.6157 9.05481C18.7647 8.83131 18.8927 8.70381 19.1157 8.55481C19.3517 8.39731 19.5847 8.25801 20.4287 7.83601C21.1657 7.46751 21.1657 6.39211 20.4287 6.02361C19.5847 5.60151 19.3517 5.46231 19.1157 5.30481C18.8927 5.15581 18.7647 5.02831 18.6157 4.80481C18.4587 4.56861 18.3187 4.33631 17.8967 3.49231C17.7127 3.12381 17.3457 2.92981 16.9907 2.92981ZM6.99073 4.92981C6.63573 4.92981 6.26874 5.12381 6.08474 5.49231C5.79974 6.06131 5.72573 6.22811 5.61573 6.39861C5.46073 6.63761 5.34573 6.72811 4.99073 6.86731C4.90173 6.90201 4.80073 6.95151 4.67873 6.99231C3.83273 7.27401 3.75673 8.43761 4.55373 8.83601C5.10073 9.10991 5.25573 9.17961 5.39673 9.27361C5.50973 9.34851 5.57173 9.41121 5.64673 9.52361C5.74073 9.66451 5.81074 9.81961 6.08474 10.3678C6.45274 11.1048 7.52873 11.1048 7.89673 10.3678C8.17073 9.81961 8.24074 9.66451 8.33473 9.52361C8.40973 9.41121 8.47174 9.34851 8.58473 9.27361C8.72573 9.17961 8.88073 9.10991 9.42873 8.83601C10.1657 8.46751 10.1657 7.39211 9.42873 7.02361C8.88073 6.74971 8.72573 6.68001 8.58473 6.58601C8.47174 6.51111 8.40973 6.44841 8.33473 6.33601C8.24074 6.19511 8.17073 6.04001 7.89673 5.49231C7.71273 5.12381 7.34573 4.92981 6.99073 4.92981ZM11.9907 10.9298C11.5927 10.9298 11.2057 11.1618 11.0537 11.6178C10.3527 13.7188 9.77973 14.2918 7.67873 14.9918C6.76673 15.2958 6.76673 16.5638 7.67873 16.8678C9.77973 17.5678 10.3527 18.1408 11.0537 20.2418C11.3567 21.1538 12.6247 21.1538 12.9287 20.2418C13.6287 18.1408 14.2017 17.5678 16.3037 16.8678C17.2147 16.5638 17.2147 15.2958 16.3037 14.9918C14.2017 14.2918 13.6287 13.7188 12.9287 11.6178C12.7767 11.1618 12.3887 10.9298 11.9907 10.9298Z'
                  fill='#1D1B1E'
                />
              </svg>
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
