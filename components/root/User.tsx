import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = { name: string; email: string; imgSrc: string };

const User = ({ name, email, imgSrc }: Props) => {
  return (
    <DropdownMenuTrigger asChild>
      <div className='flex max-w-56 cursor-pointer items-center gap-x-3.5'>
        <Avatar>
          <AvatarImage
            className='rounded-full bg-primary-50 object-contain'
            src={imgSrc}
            referrerPolicy='no-referrer'
            alt={name}
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <h2 className='text-xl font-semibold leading-tight'>{name}</h2>
          <p className='subtle-semibold text-shadow-100'>{email}</p>
        </div>
      </div>
    </DropdownMenuTrigger>
  );
};

export const UserSkeleton = () => {
  return (
    <div className='w-50 flex items-center gap-x-2'>
      <Skeleton className='h-10 w-10 shrink-0 rounded-full' />
      <div className='flex w-full flex-col gap-y-1'>
        <Skeleton className='h-6' />
        <Skeleton className='h-3.5 w-full' />
      </div>
    </div>
  );
};

export default memo(User);
