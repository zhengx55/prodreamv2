import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Locale } from '@/i18n-config';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
const UserInfoDropdown = dynamic(() => import('./UserInfoDropdown'));

type Props = { name: string; email: string; imgSrc: string; lang: Locale };

const User = ({ name, email, imgSrc, lang }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex w-full cursor-pointer items-center gap-x-2'>
          <Avatar>
            <AvatarImage
              className='rounded-full object-contain'
              src={imgSrc}
              referrerPolicy='no-referrer'
              alt={name}
            />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h2 className='title-semibold'>
              {name.length > 10 ? `${name.slice(0, 10)}...` : name}
            </h2>
            <p className='subtle-semibold text-shadow-100'>
              {email.length > 20 ? `${email.slice(0, 20)}...` : email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <UserInfoDropdown lang={lang} />
    </DropdownMenu>
  );
};

export const UserSkeleton = () => {
  return (
    <div className='flex w-[185px] items-center gap-x-2'>
      <Skeleton className='h-10 w-10 shrink-0 rounded-full' />
      <div className='flex w-full flex-col gap-y-1'>
        <Skeleton className='h-6' />
        <Skeleton className='h-3.5 w-full' />
      </div>
    </div>
  );
};

export default memo(User);
