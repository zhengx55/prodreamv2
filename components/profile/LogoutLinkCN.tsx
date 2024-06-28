'use client';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const LogoutLinkCN = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);

  const logOut = () => {
    queryClient.removeQueries();
    removeCookie('token', { path: '/' });
    router.replace('/login');
  };

  return (
    <div className='flex w-2/3 items-center justify-center py-4'>
      <span
        className='custom-font cursor-pointer text-center text-lg font-normal leading-normal text-[#E46C6C]'
        onClick={logOut}
      >
        退出登录
      </span>
    </div>
  );
};

export default memo(LogoutLinkCN);
