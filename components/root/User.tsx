import React, { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = { name: string; email: string; imgSrc: string };

const User = ({ name, email, imgSrc }: Props) => {
  return (
    <div className='flex items-center gap-x-2'>
      <Avatar>
        <AvatarImage
          className='border border-primary-200 bg-primary-50'
          src={imgSrc}
          alt={name}
        />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <h2 className='small-semibold text-black-100'>{name}</h2>
        <p className='subtle-semibold text-shadow-100'>{email}</p>
      </div>
    </div>
  );
};

export default memo(User);
