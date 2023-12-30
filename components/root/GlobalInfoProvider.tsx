'use client';
import { initialUsage } from '@/constant';
import useMount from '@/hooks/useMount';
import { getUserInfo, refreshUserSession } from '@/query/api';
import { useUsage, useUserInfo } from '@/zustand/store';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';

const GlobalInfoProvider = ({ children }: { children: ReactNode }) => {
  const updateUserInfo = useUserInfo((state) => state.setUser);
  const [_cookies, setCookie] = useCookies(['token']);
  const updateUsage = useUsage((state) => state.updateUsage);
  useMount(() => {
    async function refreshUserInfo() {
      try {
        const data = await refreshUserSession();
        const user_usage = await getUserInfo(data.email);
        /**
         * 获取用户经历信息
         * 用于检查是否是第一次登录 或是 第一次使用某些功能
         **/
        updateUserInfo(data);
        if (user_usage) updateUsage(user_usage);
        else updateUsage(initialUsage);
        setCookie('token', data.access_token, {
          path: '/',
          maxAge: 604800,
        });
      } catch (error) {
        redirect('/login');
      }
    }

    refreshUserInfo();
  });

  return children;
};
export default GlobalInfoProvider;
