"use client"
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
        <div className="w-2/3 flex justify-center items-center py-4">
            <span className="text-[#E46C6C] text-center text-lg font-normal leading-normal cursor-pointer custom-font" onClick={logOut}>
                退出登录
            </span>
        </div>
    );
};

export default memo(LogoutLinkCN);